import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

/* ────────────────────────────────────────────────────────
   Scoped styles — matches the navbar / footer design
   system (Inter font, emerald-cyan-purple palette, dark
   glassmorphism, aurora mesh backgrounds).
   ──────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

  /* ── Keyframes ── */
  @keyframes lg-auroraA {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(40px, -30px) scale(1.15); }
    66%      { transform: translate(-25px, 20px) scale(0.9); }
  }
  @keyframes lg-auroraB {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(-30px, 25px) scale(1.08); }
    66%      { transform: translate(20px, -35px) scale(1.12); }
  }
  @keyframes lg-auroraC {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(20px, 15px) scale(1.05); }
    66%      { transform: translate(-15px, -25px) scale(0.95); }
  }
  @keyframes lg-gradientLine {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes lg-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes lg-fadeUp {
    0%   { opacity: 0; transform: translateY(24px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes lg-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.35); }
    50%      { box-shadow: 0 0 20px 6px rgba(16,185,129,0.12); }
  }
  @keyframes lg-shake {
    0%, 100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
  @keyframes lg-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ── Full-page wrapper ── */
  .lg-page {
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0B1120;
    position: relative;
    overflow: hidden;
    padding: 24px;
  }

  /* ── Aurora orbs ── */
  .lg-aurora {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.45;
    pointer-events: none;
  }
  .lg-aurora--a {
    width: 520px; height: 520px;
    background: radial-gradient(circle, #10B981 0%, transparent 70%);
    top: -10%; left: -8%;
    animation: lg-auroraA 14s ease-in-out infinite;
  }
  .lg-aurora--b {
    width: 440px; height: 440px;
    background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
    bottom: -12%; right: -6%;
    animation: lg-auroraB 16s ease-in-out infinite;
  }
  .lg-aurora--c {
    width: 360px; height: 360px;
    background: radial-gradient(circle, #06B6D4 0%, transparent 70%);
    top: 40%; left: 55%;
    animation: lg-auroraC 12s ease-in-out infinite;
  }

  /* ── Card shell ── */
  .lg-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px;
    border-radius: 24px;
    overflow: hidden;
    animation: lg-fadeUp 0.7s ease-out both;
  }

  /* animated gradient border */
  .lg-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1.5px;
    background: linear-gradient(135deg, #10B981, #06B6D4, #8B5CF6, #EC4899, #10B981);
    background-size: 300% 300%;
    animation: lg-gradientLine 6s linear infinite;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .lg-card-inner {
    background: rgba(15, 25, 40, 0.82);
    backdrop-filter: blur(28px) saturate(1.4);
    -webkit-backdrop-filter: blur(28px) saturate(1.4);
    padding: 40px 36px 36px;
    border-radius: 24px;
  }

  /* ── Logo / brand ── */
  .lg-brand {
    text-align: center;
    margin-bottom: 32px;
  }
  .lg-brand-icon {
    width: 56px; height: 56px;
    margin: 0 auto 16px;
    border-radius: 16px;
    background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 28px rgba(16,185,129,0.25);
  }
  .lg-brand-icon svg {
    width: 28px; height: 28px;
    color: #fff;
  }
  .lg-brand h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #F1F5F9;
    margin: 0 0 4px;
    letter-spacing: -0.3px;
  }
  .lg-brand p {
    font-size: 14px;
    color: #94A3B8;
    margin: 0;
    font-weight: 400;
  }

  /* ── Form group ── */
  .lg-field {
    position: relative;
    margin-bottom: 22px;
  }
  .lg-field-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #CBD5E1;
    margin-bottom: 7px;
    letter-spacing: 0.2px;
  }
  .lg-field-wrap {
    position: relative;
  }
  .lg-field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748B;
    pointer-events: none;
    transition: color 0.25s;
  }
  .lg-field-input {
    width: 100%;
    padding: 13px 14px 13px 44px;
    background: rgba(30, 41, 59, 0.6);
    border: 1.5px solid rgba(100, 116, 139, 0.25);
    border-radius: 14px;
    color: #F1F5F9;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  }
  .lg-field-input::placeholder {
    color: #64748B;
  }
  .lg-field-input:focus {
    border-color: #10B981;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
    background: rgba(30, 41, 59, 0.85);
  }
  .lg-field-input:focus ~ .lg-field-icon {
    color: #10B981;
  }
  .lg-field-input.lg-field-input--error {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
    animation: lg-shake 0.35s ease-in-out;
  }

  /* password toggle */
  .lg-toggle-pass {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #64748B;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }
  .lg-toggle-pass:hover {
    color: #CBD5E1;
  }

  /* error text */
  .lg-error {
    font-size: 12px;
    color: #F87171;
    margin-top: 6px;
    padding-left: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ── Remember / forgot row ── */
  .lg-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;
  }
  .lg-remember {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .lg-remember input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px; height: 18px;
    border: 1.5px solid #475569;
    border-radius: 5px;
    background: rgba(30, 41, 59, 0.6);
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
  }
  .lg-remember input[type="checkbox"]:checked {
    background: #10B981;
    border-color: #10B981;
  }
  .lg-remember input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    left: 5px; top: 2px;
    width: 5px; height: 9px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .lg-remember span {
    font-size: 13px;
    color: #94A3B8;
  }
  .lg-forgot {
    font-size: 13px;
    color: #10B981;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .lg-forgot:hover {
    color: #34D399;
  }

  /* ── Submit button ── */
  .lg-submit {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.3s;
    background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
    box-shadow: 0 4px 20px rgba(16,185,129,0.3);
    letter-spacing: 0.3px;
  }
  .lg-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(16,185,129,0.35);
  }
  .lg-submit:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  .lg-submit:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  /* shimmer overlay */
  .lg-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.15) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: lg-shimmer 3s linear infinite;
    pointer-events: none;
  }
  .lg-submit--loading {
    pointer-events: none;
  }
  .lg-spinner {
    width: 20px; height: 20px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lg-spin 0.7s linear infinite;
    display: inline-block;
  }

  /* ── Divider ── */
  .lg-divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 26px 0;
  }
  .lg-divider::before,
  .lg-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #334155, transparent);
  }
  .lg-divider span {
    font-size: 12px;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }

  /* ── Social buttons ── */
  .lg-socials {
    display: flex;
    gap: 12px;
  }
  .lg-social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid rgba(100,116,139,0.25);
    background: rgba(30,41,59,0.5);
    color: #CBD5E1;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
  }
  .lg-social-btn:hover {
    border-color: rgba(100,116,139,0.5);
    background: rgba(30,41,59,0.8);
    transform: translateY(-1px);
  }
  .lg-social-btn svg {
    width: 20px; height: 20px;
  }

  /* ── Footer link ── */
  .lg-footer-text {
    text-align: center;
    margin-top: 28px;
    font-size: 14px;
    color: #94A3B8;
  }
  .lg-footer-text a {
    color: #10B981;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }
  .lg-footer-text a:hover {
    color: #34D399;
  }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .lg-card-inner {
      padding: 32px 22px 28px;
    }
    .lg-brand-icon {
      width: 48px; height: 48px;
    }
    .lg-brand h1 {
      font-size: 22px;
    }
    .lg-socials {
      flex-direction: column;
    }
  }
`;

/* ── Inline SVG icons (no dependency on icon fonts) ── */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);
const BrandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   Login Component
   ═══════════════════════════════════════════════════════ */
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Validation schema ── */
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(12, "Password cannot exceed 12 characters")
      .required("Password is required"),
  });

  /* ── Form handler ── */
  function callApi(values) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Login submitted:", values);
      setIsSubmitting(false);
    }, 1800);
  }

  const {
    handleSubmit,
    values,
    handleBlur,
    errors,
    handleChange,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: callApi,
    validationSchema: schema,
  });

  return (
    <>
      <style>{styles}</style>

      <div className="lg-page">
        {/* Aurora background orbs */}
        <div className="lg-aurora lg-aurora--a" />
        <div className="lg-aurora lg-aurora--b" />
        <div className="lg-aurora lg-aurora--c" />

        {/* Card */}
        <div className="lg-card">
          <div className="lg-card-inner">
            {/* ── Brand ── */}
            <div className="lg-brand">
              <div className="lg-brand-icon">
                <BrandIcon />
              </div>
              <h1>Welcome Back</h1>
              <p>Sign in to continue to your account</p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="lg-field">
                <label className="lg-field-label" htmlFor="login-email">
                  Email Address
                </label>
                <div className="lg-field-wrap">
                  <span className="lg-field-icon"><MailIcon /></span>
                  <input
                    id="login-email"
                    className={`lg-field-input${touched.email && errors.email ? " lg-field-input--error" : ""}`}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="lg-error"><AlertIcon /> {errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="lg-field">
                <label className="lg-field-label" htmlFor="login-password">
                  Password
                </label>
                <div className="lg-field-wrap">
                  <span className="lg-field-icon"><LockIcon /></span>
                  <input
                    id="login-password"
                    className={`lg-field-input${touched.password && errors.password ? " lg-field-input--error" : ""}`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ paddingRight: 48 }}
                  />
                  <button
                    type="button"
                    className="lg-toggle-pass"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <div className="lg-error"><AlertIcon /> {errors.password}</div>
                )}
              </div>

              {/* Remember / Forgot */}
              <div className="lg-meta-row">
                <label className="lg-remember">
                  <input type="checkbox" id="login-remember" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="lg-forgot">Forgot password?</a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`lg-submit${isSubmitting ? " lg-submit--loading" : ""}`}
                disabled={!(dirty && isValid) || isSubmitting}
                id="login-submit"
              >
                {isSubmitting ? <span className="lg-spinner" /> : "Sign In"}
              </button>
            </form>

            {/* ── Divider ── */}
            <div className="lg-divider"><span>or continue with</span></div>

            {/* ── Social login ── */}
            <div className="lg-socials">
              <button type="button" className="lg-social-btn" id="login-google">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="lg-social-btn" id="login-github">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* ── Footer ── */}
            <p className="lg-footer-text">
              Don't have an account?{" "}
              <Link to="/signup">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;