const googleSheetsService = require('../services/googleSheetsService');

exports.submitQuestions = async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.willAttend) {
      return res.status(400).json({
        status: 'error',
        message: 'Необхідно заповнити всі обов\'язкові поля'
      });
    }

    // Append data to Google Sheets
    await googleSheetsService.appendFormData(formData);

    res.status(200).json({
      status: 'success',
      message: 'Дані успішно збережено!'
    });
  } catch (error) {
    console.error('Error submitting questions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Виникла помилка при збереженні даних'
    });
  }
};
