import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
      validate: {
        validator: (url) => {
          // Example URL validation logic
          const urlRegex = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

// Add indexes if needed
urlSchema.index({ shortId: 1 });

export default mongoose.model("URL", urlSchema);
