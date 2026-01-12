export default () => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: process.env.SUPABASE_API_URL
          ? `${process.env.SUPABASE_API_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}`
          : undefined,
        s3Options: {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET,
          },
          endpoint: process.env.SUPABASE_API_URL
            ? `${process.env.SUPABASE_API_URL}/storage/v1/s3`
            : undefined,
          region: process.env.AWS_REGION || 'sa-east-1', // Region doesn't matter much for Supabase S3 wrapper but is required
          forcePathStyle: true,
          params: {
            Bucket: process.env.SUPABASE_BUCKET,
          },
        },
      },
      breakpoints: process.platform === 'win32' ? {} : undefined, // Disable responsive images on Windows to prevent EPERM errors
      sizeOptimization: process.platform === 'win32' ? false : true,
      autoOrientation: process.platform === 'win32' ? false : true,
    },
  },
  ckeditor5: {
    enabled: true,
  },
});
