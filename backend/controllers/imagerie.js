const Imagerie = require('../model/imagerie');

exports.getAllImagerie = async (req, res) => {
  try {
    const id_patient = req.params.id_patient;
    const imageries = await Imagerie.getAllImagerie(id_patient);
    res.status(200).json(imageries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};

exports.addImagerie = async (req, res) => {
  try {
    const { description, date_prise, id_patient } = req.body;
    const newImagerie = new Imagerie(req.file.filename, description, date_prise);
    const result = await newImagerie.save(id_patient);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};