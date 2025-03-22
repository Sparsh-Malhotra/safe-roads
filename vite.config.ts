import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "prompt",
            includeAssets: [
                "favicon.ico",
                "apple-touch-icon.png",
                "mask-icon.svg",
            ],
            manifest: {
                name: "SafeRoads",
                short_name: "SafeRoads",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "public/manifest-icon-192.maskable.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "public/manifest-icon-192.maskable.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable",
                    },
                    {
                        src: "public/manifest-icon-512.maskable.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "public/manifest-icon-512.maskable.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
