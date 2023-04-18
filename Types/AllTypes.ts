export interface pavti {
    pavti_no: number;
    pavti_Date: string;
    Dengidar_name: string;
    Dengidar_Address: string;
    mobile: string;
    Dengidar_money: number;
    Shera: string;
  }


 export interface resUser {
    username: string;
    mobile: string;
  }
  
  export interface contextUser {
    currentAdmin: null | resUser;
    setCurrentAdmin: (user: resUser) => null;
  }
  

  export interface MyProp {
    children: JSX.Element;
  }