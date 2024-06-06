import { Router } from 'express';
import { GetAllPendingSuppliers, ApproveSupplier, RejectSupplier, SubmitSupplierDetails } from '../controllers/ApprovalController';

const supplierRoutes = Router();

supplierRoutes.get('/get-pending-suppliers', GetAllPendingSuppliers);
supplierRoutes.put('/approve-supplier/:userId', ApproveSupplier);
supplierRoutes.put('/reject-supplier/:userId', RejectSupplier);
supplierRoutes.post('/submit-details', SubmitSupplierDetails);

export default supplierRoutes;
