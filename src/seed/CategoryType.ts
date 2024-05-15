export type SpecificationsType = { [key: string]: string[] };

  
  export interface SubcategoryType {
    [subcategoryName: string]: {
      Specifications: SpecificationsType[];
    };
  }
  

  export interface CategoryType {
    [key: string]: {
      [key: string]: {
        Specifications: SpecificationsType;
      };
    };
  }
  