import { pavti } from "@/Types/AllTypes";

const PavtiCard = ({
  pavti_no,
  pavti_Date,
  Dengidar_name,
  Dengidar_Address,
  Dengidar_money,
  Shera,
  mobile,
}: pavti) => {
  return (
    <div className="shadow rounded-md p-5">
      <p>पावती क्रमांक : {pavti_no}</p>
      <p>तारीख : {pavti_Date}</p>
      <p>देणगीदाराचे नाव : {Dengidar_name}</p>
      <p>देणगीदाराचा पत्ता : {Dengidar_Address}</p>
      <p>देणगीदाराचा फोन नंबर : {mobile}</p>
      <p>देणगीदाराने दिलेली रक्कम : {Dengidar_money.$numberDecimal} रुपये</p>
      <p>शेरा : {Shera}</p>
    </div>
  );
};

export default PavtiCard;
