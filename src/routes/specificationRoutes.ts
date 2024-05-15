import express from 'express';
import {
  createSpecification,
  getSpecifications,
  getSpecificationById,
  updateSpecification,
  deleteSpecification
} from '../controllers/specificationController';

const specificationRoutes = express.Router();

specificationRoutes.post('/', createSpecification);
specificationRoutes.get('/', getSpecifications);
specificationRoutes.get('/:id', getSpecificationById);
specificationRoutes.put('/:id', updateSpecification);
specificationRoutes.delete('/:id', deleteSpecification);

export default specificationRoutes;
