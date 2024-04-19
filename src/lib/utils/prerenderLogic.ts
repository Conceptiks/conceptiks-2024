export const shouldPreRender = () => {
  return (
    (process.env.NETLIFY === "true" &&
      (process.env.CONTEXT === "production" ||
        process.env.branch === "main")) ||
    process.env.FORCE_PRERENDERING === "true"
  );
};
