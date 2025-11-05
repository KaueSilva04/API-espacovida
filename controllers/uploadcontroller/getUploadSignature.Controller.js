const cloudinary = require('../../utils/cloudinary.js');

module.exports = {
  async getUploadSignature(req, res) {
    try {
      const timestamp = Math.round(Date.now() / 1000);

      const paramsToSign = {
        timestamp,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        folder: process.env.CLOUDINARY_DEFAULT_FOLDER,
      };

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
      );

      return res.json({
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        folder: process.env.CLOUDINARY_DEFAULT_FOLDER,
      });
    } catch (err) {
      console.error('Erro ao gerar assinatura do Cloudinary:', err);
      res.status(500).json({ message: 'Erro ao gerar assinatura do upload' });
    }
  },
};
