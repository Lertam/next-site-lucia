-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "way" "PaymentGateways" NOT NULL DEFAULT 'WALLET_ONE';
