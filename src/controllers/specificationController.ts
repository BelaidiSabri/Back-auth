import { Specification } from "../models/CategoriesAndSpecifications";

// Create a new specification
export const createSpecification = async (req, res) => {
  const { name, value } = req.body;

  try {
    // Split value string into an array if it's a string
    const valueArray = Array.isArray(value) ? value : value.split(',').map(val => val.trim());

    const newSpecification = new Specification({ name, value: valueArray });
    await newSpecification.save();
    res.status(201).json(newSpecification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all specifications
export const getSpecifications = async (req, res) => {
  try {
    const specifications = await Specification.find();
    res.status(200).json(specifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single specification by ID
export const getSpecificationById = async (req, res) => {
  try {
    const specification = await Specification.findById(req.params.id);
    if (!specification) return res.status(404).json({ message: 'Specification not found' });
    res.status(200).json(specification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specification by ID
export const updateSpecification = async (req, res) => {
  try {
    const { name, value } = req.body;

    // Split value string into an array if it's a string
    const valueArray = Array.isArray(value) ? value : value.split(',').map(val => val.trim());

    const specification = await Specification.findByIdAndUpdate(
      req.params.id,
      { name, value: valueArray },
      { new: true }
    );

    if (!specification) return res.status(404).json({ message: 'Specification not found' });

    res.status(200).json(specification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a specification by ID
export const deleteSpecification = async (req, res) => {
  try {
    const specification = await Specification.findByIdAndDelete(req.params.id);
    if (!specification) return res.status(404).json({ message: 'Specification not found' });
    res.status(200).json({ message: 'Specification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

