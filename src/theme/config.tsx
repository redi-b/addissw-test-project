export const shared = {
  typography: {
    fontFamily: {
      default: "Inter Variable",
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    default: "0.625rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export const lightTheme = {
  colors: {
    background: "#FAFAFA",
    foreground: "#1A1A1A",

    primary: {
      background: "#6366F1", // indigo-500
      foreground: "#FFFFFF",
      hover: "#4F46E5", // indigo-600
      active: "#4338CA", // indigo-700
      focus: "#C7D2FE", // indigo-200
    },
    secondary: {
      background: "#D4D4D8", // zinc-300
      foreground: "#111827", // gray-900
      hover: "#E4E4E7", // zinc-400
      active: "#6B7280", // gray-500
      focus: "#BFDBFE", // blue-200
    },
    tertiary: {
      background: "#FDE68A", // yellow-200
      foreground: "#78350F", // amber-900
      hover: "#FCD34D", // yellow-300
      active: "#FBBF24", // yellow-400
      focus: "#FEF9C3", // yellow-100
    },
    muted: {
      background: "#F9FAFB", // gray-50
      foreground: "#6B7280", // gray-500
      hover: "#E5E7EB", // gray-200
      active: "#D1D5DB", // gray-300
    },
    accent: {
      background: "#CCFBF1", // teal-100
      foreground: "#134E4A", // teal-800
      hover: "#99F6E4", // teal-200
      active: "#5EEAD4", // teal-300
      focus: "#A7F3D0", // teal-200
    },
    destructive: {
      background: "#DC2626", // red-600
      foreground: "#FFFFFF",
      hover: "#B91C1C", // red-700
      active: "#991B1B", // red-800
      focus: "#FEE2E2", // red-100
    },
    card: {
      background: "#F8FAFC", // slate-50
      foreground: "#0F172A", // slate-900
      hover: "#F1F5F9", // slate-100
      active: "#E2E8F0", // slate-200
      focus: "#DBEAFE", // blue-100
    },
    popover: {
      background: "#FFFFFF",
      foreground: "#1A1A1A",
      hover: "#F9FAFB",
      active: "#E5E7EB",
      focus: "#F0F9FF", // light blue hint
    },

    border: "#E5E7EB", // gray-200
    input: "#F9FAFB",
    inputFocus: "#A3BFFA", // light blue
    ring: "#4B6EA8", // muted blue
  },
  ...shared,
};

export const darkTheme = {
  colors: {
    background: "#0F172A", // slate-900
    foreground: "#F1F5F9", // slate-100

    primary: {
      background: "#8B5CF6", // violet-500
      foreground: "#F8FAFC", // slate-50
      hover: "#7C3AED", // violet-600
      active: "#6D28D9", // violet-700
      focus: "#C4B5FD", // violet-300
    },
    secondary: {
      background: "#334155", // slate-700
      foreground: "#F1F5F9",
      hover: "#475569", // slate-600
      active: "#1E293B", // slate-800
      focus: "#64748B", // slate-500
    },
    tertiary: {
      background: "#92400E", // amber-700
      foreground: "#FDE68A", // yellow-200
      hover: "#B45309", // amber-600
      active: "#78350F", // amber-800
      focus: "#FBBF24", // yellow-400
    },
    muted: {
      background: "#374151",
      foreground: "#CBD5E1", // slate-300
      hover: "#4B5563",
      active: "#64748B", // slate-500
    },
    accent: {
      background: "#164E63", // cyan-900
      foreground: "#A5F3FC", // cyan-100
      hover: "#155E75", // cyan-800
      active: "#0E7490", // cyan-700
      focus: "#22D3EE", // cyan-300
    },
    destructive: {
      background: "#EF4444", // red-400
      foreground: "#F8FAFC",
      hover: "#DC2626", // red-500
      active: "#B91C1C", // red-600
      focus: "#FEE2E2", // red-100
    },
    card: {
      background: "#1E293B", // slate-800
      foreground: "#E2E8F0", // slate-200
      hover: "#273449", // slightly lighter for hover
      active: "#334155", // slate-700
      focus: "#3B82F6", // blue-500
    },
    popover: {
      background: "#1E293B",
      foreground: "#F1F5F9",
      hover: "#334155",
      active: "#475569",
      focus: "#0EA5E9", // cyan-500
    },
    border: "#475569",
    input: "#334155",
    inputFocus: "#60A5FA", // blue-400
    ring: "#3B82F6", // blue-500
  },
  ...shared,
};

export type AppTheme = typeof lightTheme;
