import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path"; // path 모듈을 임포트합니다.


// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@'를 'src' 폴더로 매핑합니다.
    },
  },
});
