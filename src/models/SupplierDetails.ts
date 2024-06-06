import mongoose, { Schema, Document } from 'mongoose';

interface ISupplierContactInfo {
    address: string;
    phoneNumber: string;
}

interface ISupplierBusinessInfo {
    businessName: string;
    businessType: string;
    tin: string;
    businessLicenseNumber: string;
    companyRegistrationNumber: string;
}

interface ISupplierBankingInfo {
    bankAccountNumber: string;
    bankName: string;
    routingNumber: string;
}

interface ISupplierVerificationDocuments {
    idDocument: Buffer | null;
    businessLicense: Buffer | null;
    proofOfAddress: Buffer | null;
}

interface ISupplierAgreements {
    termsAndConditions: boolean;
    privacyPolicy: boolean;
}

export interface ISupplierDetails extends Document {
    nationality: string;
    department: string;
    contactInfo: ISupplierContactInfo;
    businessInfo: ISupplierBusinessInfo;
    bankingInfo: ISupplierBankingInfo;
    verificationDocuments: ISupplierVerificationDocuments;
    agreements: ISupplierAgreements;
}

const supplierDetailsSchema = new Schema<ISupplierDetails>({
    nationality: { type: String, required: true },
    department: { type: String, required: true },
    contactInfo: {
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    businessInfo: {
        businessName: { type: String, required: true },
        businessType: { type: String, required: true },
        tin: { type: String, required: true },
        businessLicenseNumber: { type: String, required: true },
        companyRegistrationNumber: { type: String, required: true },
    },
    bankingInfo: {
        bankAccountNumber: { type: String, required: true },
        bankName: { type: String, required: true },
        routingNumber: { type: String, required: true },
    },
    verificationDocuments: {
        idDocument: { type: Buffer, required: true },
        businessLicense: { type: Buffer, required: true },
        proofOfAddress: { type: Buffer, required: true },
    },
    agreements: {
        termsAndConditions: { type: Boolean, required: true },
        privacyPolicy: { type: Boolean, required: true },
    },
});

const SupplierDetails = mongoose.model<ISupplierDetails>('SupplierDetails', supplierDetailsSchema);
export default SupplierDetails;
