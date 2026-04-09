"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, Lock, User, GraduationCap,
  School, Loader2, ArrowRight
} from "lucide-react";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  role: z.enum(["STUDENT", "TEACHER"]),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
}

// Reusable input wrapper
function InputField({
  icon: Icon,
  error,
  children,
}: {
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
    </div>
  );
}

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "MALE",
      role: "STUDENT",
    },
  });

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm";

  return (
    <div className="w-full max-w-[420px] bg-white dark:bg-gray-950 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Role Toggle */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {(["STUDENT", "TEACHER"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => field.onChange(r)}
                  className={`py-3 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all text-sm font-medium ${
                    field.value === r
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-100 text-gray-400"
                  }`}
                >
                  {r === "STUDENT" ? <GraduationCap size={18} /> : <School size={18} />}
                  {r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}
        />

        {/* First Name + Last Name side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              )}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 pl-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              )}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 pl-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <InputField icon={User} error={errors.username?.message}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Username" className={inputClass} />
            )}
          />
        </InputField>

        {/* Email */}
        <InputField icon={Mail} error={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input {...field} type="email" placeholder="Email Address" className={inputClass} />
            )}
          />
        </InputField>

        {/* Password */}
        <InputField icon={Lock} error={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input {...field} type="password" placeholder="Password" className={inputClass} />
            )}
          />
        </InputField>

        {/* Gender Toggle */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {(["MALE", "FEMALE"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => field.onChange(g)}
                  className={`py-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    field.value === g
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-100 text-gray-400"
                  }`}
                >
                  {g.charAt(0) + g.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>Register <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
}