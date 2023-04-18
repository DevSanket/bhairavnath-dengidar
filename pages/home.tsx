import { pavti } from "@/Types/AllTypes";
import PavtiCard from "@/components/PavtiCard";
import { AdminContext } from "@/context/user.context";
import User from "@/layout/User";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [allPavti, setAllPavti] = useState<[pavti] | [] | null>([]);
  const { currentAdmin } = useContext(AdminContext);

  const getData = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/user/getAllPavti/${currentAdmin?.mobile}`
      )
      .then((res) => {
        console.log(res);

        setAllPavti(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("पावती मिळाली नाही");
      });
  };

  useEffect(() => {
    getData();
  }, [currentAdmin]);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <p className="font-medium text-center text-lg">
          आपण केलेल्या सहकार्याबद्दल आपले आभार
        </p>
        <div className="flex flex-col space-y-5">
          {allPavti?.length &&
            allPavti.map((pavti, i) => (
              <PavtiCard
                key={i}
                pavti_no={pavti.pavti_no}
                pavti_Date={pavti.pavti_Date}
                Dengidar_name={pavti.Dengidar_name}
                Dengidar_money={pavti.Dengidar_money}
                Dengidar_Address={pavti.Dengidar_Address}
                Shera={pavti.Shera}
                mobile={pavti.mobile}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

Home.layout = User;

export default Home;
