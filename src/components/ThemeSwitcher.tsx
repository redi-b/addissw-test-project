import { css, useTheme } from "@emotion/react";
import { Sun, Moon, Monitor, Check } from "lucide-react";

import { ThemeMode, useThemeMode } from "@/contexts/ThemeContext";
import * as Dropdown from "@/components/ui/Dropdown";
import { ActionButton } from "@/components/ui/Button";

const themeOptions = [
  { name: "System", value: "system", icon: <Monitor size={18} /> },
  { name: "Dark", value: "dark", icon: <Moon size={18} /> },
  { name: "Light", value: "light", icon: <Sun size={18} /> },
];

const ThemeSwitcher = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const theme = useTheme();

  const activeIcon = themeOptions.find((opt) => opt.value === themeMode)?.icon;

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <ActionButton>
          {activeIcon}
          <span>Select Theme</span>
        </ActionButton>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          sideOffset={5}
          css={css`
            z-index: 50;
          `}
        >
          {themeOptions.map((option) => {
            const isSelected = themeMode === option.value;

            return (
              <Dropdown.Item
                key={option.value}
                onSelect={() => setThemeMode(option.value as ThemeMode)}
                asChild
              >
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: ${theme.spacing.sm};
                    padding: ${theme.spacing.xs} ${theme.spacing.sm};
                    border-radius: ${theme.borderRadius.sm};
                    background-color: ${isSelected
                      ? theme.colors.accent.background
                      : "transparent"};
                    transition: background-color 0.2s;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: ${theme.spacing.md};
                      color: ${isSelected
                        ? theme.colors.accent.foreground
                        : theme.colors.foreground};
                    `}
                  >
                    {option.icon}
                    <span>{option.name}</span>
                  </div>

                  {isSelected && (
                    <Check size={16} color={theme.colors.accent.foreground} />
                  )}
                </div>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};

export default ThemeSwitcher;
