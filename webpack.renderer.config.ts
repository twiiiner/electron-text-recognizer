import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.module\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]__[local]--[hash:base64:5]", // Формат имени класса
          },
          importLoaders: 1,
        },
      },
      "sass-loader",
    ],
  },
  {
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  }
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "@": path.join(__dirname, "src"),
      "@images": path.join(__dirname, "src/frontend/assets/images"),
      "@shared": path.join(__dirname, "src/frontend/components/shared"),
    },
  },
};
