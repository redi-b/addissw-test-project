import "@emotion/react";
import type { AppTheme } from "./theme/config";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
