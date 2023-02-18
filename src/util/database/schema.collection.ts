type SchemaCollectionsConfig = {
  [key: string]: {
    path: string;
    name: string;
    ref: string;
  };
};

export const dbSchemaCollections: SchemaCollectionsConfig = {
  // Features
  store: {
    path: 'stores',
    name: 'stores',
    ref: 'Store',
  },
  storeModule: {
    path: 'stores',
    name: 'stores',
    ref: 'Store',
  },
  groupService: {
    path: 'group-services',
    name: 'groupservices',
    ref: 'GroupService',
  },
  service: {
    path: 'services',
    name: 'services',
    ref: 'Service',
  },
  serviceOrder: {
    path: 'service-orders',
    name: 'serviceorders',
    ref: 'ServiceOrder',
  },
  review: {
    path: 'reviews',
    name: 'reviews',
    ref: 'Review',
  },
  voucher: {
    path: 'vouchers',
    name: 'vouchers',
    ref: 'Voucher',
  },
  voucherTemplateDefault: {
    path: 'voucher-template-defaults',
    name: 'vouchertemplatedefaults',
    ref: 'VoucherTemplateDefault',
  },
  asset: {
    path: 'assets',
    name: 'assets',
    ref: 'Asset',
  },
  assetPackage: {
    path: 'asset-packages',
    name: 'assetpackages',
    ref: 'AssetPackage',
  },
  storePackageTransaction: {
    path: 'store-package-transactions',
    name: 'storepackagetransactions',
    ref: 'StorePackageTransaction',
  },
  templateDefault: {
    path: 'template-defaults',
    name: 'templatedefaults',
    ref: 'TemplateDefault',
  },
  template: {
    path: 'templates',
    name: 'templates',
    ref: 'Template',
  },
  storeAppointment: {
    path: 'store-appointments',
    name: 'storeappointments',
    ref: 'StoreAppointment',
  },
  storeCareCustomer: {
    path: 'store-care-customers',
    name: 'storecarecustomers',
    ref: 'StoreCareCustomer',
  },
  storeWelcomeBack: {
    path: 'store-welcomebacks',
    name: 'storewelcomebacks',
    ref: 'StoreWelcomeBack',
  },
  storeFeedbackReview: {
    path: 'store-feedback-reviews',
    name: 'storefeedbackreviews',
    ref: 'StoreFeedbackReview',
  },
  appointment: {
    path: 'appointments',
    name: 'appointments',
    ref: 'Appointment',
  },
  careCustomer: {
    path: 'care-customers',
    name: 'carecustomers',
    ref: 'CareCustomer',
  },
  welcomeBack: {
    path: 'welcomebacks',
    name: 'welcomebacks',
    ref: 'WelcomeBack',
  },
  feedbackReview: {
    path: 'feedback-reviews',
    name: 'feedbackreviews',
    ref: 'FeedbackReview',
  },
  campaign: {
    path: 'campaigns',
    name: 'campaigns',
    ref: 'Campaign',
  },
  customerGroup: {
    path: 'customer-groups',
    name: 'customer-groups',
    ref: 'CustomerGroup',
  },
};
