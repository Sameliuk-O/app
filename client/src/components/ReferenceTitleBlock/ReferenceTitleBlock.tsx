import icomoon from "@/constants/icomoon.json";
import IcoMoon from "react-icomoon";
import { Link } from "react-router-dom";

const ReferenceTitleBlock = () => {
  return (
    <section className="border-b border-b-gray500 pb-2.5 flex lg:px-6">
      <Link to="/information">
        <IcoMoon
          iconSet={icomoon}
          icon="arrow_left"
          className="h-5 mt-2 mr-3 fill-gray400 hover:fill-gray600"
        />
      </Link>
      <h1 className="text-2xl text-grayMain">Довідкова</h1>
    </section>
  );
};

export default ReferenceTitleBlock;
