import path from "path";

export default {
  mode: "development",
  entry: {
    map: "",
    addImage: ""
  },
  output: {
    filename:"[name].js",
    path: path.resolve("public.js")
  }
}