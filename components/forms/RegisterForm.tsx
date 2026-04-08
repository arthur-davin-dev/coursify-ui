import { useState } from "react"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../features/auth/authApi"
import { toast } from "react-toastify"

// ── Validation Schema ──────────────────────────────────
const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z
    .string()
    .min(1, "Email is required ")
    .email("Invalid email address "),
  password: z
    .string()
    .min(1, "Password is required ")
    .min(8, "Password must be at least 8 characters ")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["student", "teacher"], {
    errorMap: () => ({ message: "Please select a role " }),
  }),
})

const toFieldErrors = (issues) => {
  const out = {}
  issues.forEach((i) => {
    const key = i.path?.[0]
    if (key && !out[key]) out[key] = i.message
  })
  return out
}

// ── Icons ──────────────────────────────────────────────
const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const RoleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Reusable Label ─────────────────────────────────────
const FieldLabel = ({ htmlFor, en, km, required }) => (
  <label
    htmlFor={htmlFor}
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: "6px",
      marginBottom: "6px",
      paddingLeft: "2px"
    }}
  >
    <span
      style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
        fontSize: "18px",   // ✅ bigger
        color: "#2F327D",
        letterSpacing: "0.01em"
      }}
    >
      {en}
    </span>

    {km && (
      <span
        style={{
          fontFamily: '"Kantumruy Pro", sans-serif',
          fontWeight: 400,
          fontSize: "18px",   // ✅ same size
          color: "#696984"
        }}
      >
        / {km}
      </span>
    )}

    {required && (
      <span
        style={{
          color: "#DB2C2C",
          fontSize: "18px",  // ✅ match size
          lineHeight: 1
        }}
      >
        *
      </span>
    )}
  </label>
)

// ── Password Strength Indicator ────────────────────────
const passwordRules = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter (A–Z)", test: (v) => /[A-Z]/.test(v) },
  { label: "One number (0–9)", test: (v) => /[0-9]/.test(v) },
]

const PasswordStrength = ({ password }) => {
  if (!password) return null
  const passed = passwordRules.filter((r) => r.test(password)).length
  const strengthColor = passed === 1 ? "#ef4444" : passed === 2 ? "#f59e0b" : "#22c55e"
  const strengthLabel = passed === 1 ? "Weak" : passed === 2 ? "Fair" : "Strong"

  return (
    <div style={{ marginTop: "8px", padding: "10px 12px", background: "#f8faff", borderRadius: "10px", border: "1px solid #e8eef8" }}>
      {/* Bar */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1, height: "4px", borderRadius: "2px",
              background: i <= passed ? strengthColor : "#e2e8f0",
              transition: "background 0.3s ease",
            }}
          />
        ))}
        <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: "11px", fontWeight: 600, color: strengthColor, marginLeft: "6px", minWidth: "40px" }}>
          {strengthLabel}
        </span>
      </div>
      {/* Rules */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {passwordRules.map((rule) => {
          const ok = rule.test(password)
          return (
            <div key={rule.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: ok ? "#22c55e" : "#94a3b8", flexShrink: 0 }}>
                {ok ? <CheckIcon /> : <XIcon />}
              </span>
              <span style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: "11px",
                color: ok ? "#22c55e" : "#94a3b8",
                transition: "color 0.2s",
              }}>
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────
export default function RegisterComponent({ onGoLogin }) {
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()

  const [form, setForm] = useState({ username: "", email: "", password: "", role: "" })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Live validate on change if field was already touched
    if (touched[name]) {
      const result = registerSchema.safeParse({ ...form, [name]: value })
      if (!result.success) {
        const fieldErrors = toFieldErrors(result.error.issues)
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }))
      }
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    // Validate single field on blur
    const result = registerSchema.safeParse({ ...form, [name]: value })
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error.issues)
      if (fieldErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }))
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Mark all as touched
    setTouched({ username: true, email: true, password: true, role: true })

    const result = registerSchema.safeParse(form)
    if (!result.success) {
      setErrors(toFieldErrors(result.error.issues))
      return
    }

    try {
      await register({
        username:      form.username,
        email:         form.email,
        password:      form.password,
        role:          form.role,
        full_name:     form.username,
        date_of_birth: "2000-01-01",
        gender:        "male",
        profile_url:   "",
        bio:           "",
        address:       "",
        phone_number:  "",
      }).unwrap()

      setSuccess(true)
      toast.success("Account created successfully!")
      setTimeout(() => navigate("/login"), 1200)
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.detail || "Registration failed")
    }
  }

  const inputCls = (hasError) =>
    [
      "w-full bg-[#dbeafe] rounded-xl pl-11 pr-4 py-3 text-sm text-[#1a2a50]",
      "outline-none transition-all duration-200 border-2",
      "placeholder:text-[#93afd4]",
      "focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10",
      hasError ? "border-red-400 bg-red-50" : "border-transparent",
    ].join(" ")

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1fr] bg-gray-900 auth-font-body">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col items-center justify-center relative bg-[#1a2a50] overflow-hidden px-10">
        <div
          className="absolute w-[450px] h-[450px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 w-150 rounded-6xl overflow-hidden auth-float flex items-center justify-center mb-8">
          <img
            src="/assets/Images/register.png"
            alt="Register illustration"
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = "/assets/Images/login.png" }}
          />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2 text-center auth-font-title">
          Join <span className="text-[#e5383b]">KH</span><span className="text-[#e5383b]">demy</span>
        </h2>
        <p className="text-white/50 text-[20px] text-center mb-8">
          Start your learning journey today
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="bg-white flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 auth-panel-fade">
        <div className="max-w-md w-full mx-auto">

          <h1
            className="text-center text-2xl font-extrabold text-blue-700 mb-1 tracking-tight auth-font-title"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            REGISTER
          </h1>
          <p
            className="text-center text-[18px] text-gray-400 mb-8"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Create your account and start learning
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Username */}
            <div>
              <FieldLabel htmlFor="username" en="Username" required />
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93afd4]">
                  <UserIcon />
                </span>
                <input
                  id="username"
                  className={inputCls(errors.username)}
                  name="username"
                  type="text"
                  placeholder="e.g. john_doe"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="username"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-[15px] text-red-500 pl-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <FieldLabel htmlFor="email" en="Email Address" required />
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93afd4]">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  className={inputCls(errors.email)}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[15px] text-red-500 pl-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <FieldLabel htmlFor="password" en="Password" required />
              <div className="relative flex items-center">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93afd4]">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  className={`${inputCls(errors.password)} pr-11`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 text-[#93afd4] hover:text-blue-600 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[15px] text-red-500 pl-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {errors.password}
                </p>
              )}
              {/* Password strength shown while typing */}
              <PasswordStrength password={form.password} />
            </div>

            {/* Role */}
            <div>
              <FieldLabel htmlFor="role" en="Role" required />
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93afd4]">
                  <RoleIcon />
                </span>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputCls(errors.role)} appearance-none cursor-pointer`}
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                {/* Chevron */}
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#93afd4] pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
              {errors.role && (
                <p className="mt-1 text-[15px] text-red-500 pl-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {errors.role}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className={[
                "w-full py-3 rounded-xl text-sm font-bold tracking-wide text-white mt-2",
                "transition-all duration-200 border-none cursor-pointer",
                "disabled:opacity-75 disabled:cursor-not-allowed",
                "hover:-translate-y-px active:translate-y-0",
                success
                  ? "bg-green-600 shadow-[0_4px_14px_rgba(22,163,74,0.3)]"
                  : "bg-blue-700 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-blue-800",
              ].join(" ")}
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              {isLoading ? "Creating account..." : success ? "✓ Account Created!" : "Register Now"}
            </button>

          </form>

          {/* Login link */}
          <p
            className="mt-8 text-center text-[17px] text-gray-400"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => onGoLogin?.()}
              className="text-blue-700 font-bold underline underline-offset-2 hover:text-blue-900 transition-colors bg-none border-none cursor-pointer p-0"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}