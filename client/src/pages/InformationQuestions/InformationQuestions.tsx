import { Block } from "@/components/ui/Block";
import { oftenQuestion } from "@/constants/oftenQuestions.tsx";
import { useState } from "react";
import IcoMoon from "react-icomoon";
import { Link, useParams } from "react-router-dom";
import icomoon from "@/constants/icomoon.json";
import { ReferenceTitleBlock } from "@/components/ReferenceTitleBlock";

const InformationQuestions = () => {
  const { questions } = useParams();
  const [showActiveElement, setShowActiveElement] = useState<Array<number>>([
    1,
  ]);

  const questionsInfo = oftenQuestion.find((el) => el.link === questions);

  return (
    <Block className="border-0 pb-5 px-0 lg:border lg:p-5">
      <ReferenceTitleBlock />

      <section>
        <h2 className="text-2xl text-grayMain my-5 lg:text-3xl lg:mx-6">
          {questionsInfo?.text}
        </h2>

        {questionsInfo?.questions.map((value, index) => (
          <Block
            className="my-2.5 px-4 text-xl cursor-pointer hover:bg-gray50 hover:shadow-lg"
            key={questionsInfo.link + value.question}
          >
            <button
              className="flex justify-between py-5 items-center w-full"
              onClick={() => {
                if (
                  showActiveElement.find((element) => element === index + 1)
                ) {
                  setShowActiveElement(
                    showActiveElement.filter(
                      (element) => element !== index + 1,
                    ),
                  );
                } else {
                  setShowActiveElement([...showActiveElement, index + 1]);
                }
              }}
            >
              <p className="text-gray800">{value.question}</p>
              <IcoMoon
                iconSet={icomoon}
                icon="arrow_left"
                className={`h-5 fill-gray500 hover:fill-gray600 ${showActiveElement.find((element) => element === index + 1) ? "rotate-[90deg]" : "rotate-[270deg]"}`}
              />
            </button>
            {showActiveElement.includes(index + 1) && (
              <p className="text-gray800 pb-4">{value.answer}</p>
            )}
          </Block>
        ))}
      </section>

      <Block className="p-5 text-center text-xl text-gray800 sm:mx-3 lg:mx-6 cursor-pointer hover:bg-gray50 hover:shadow-lg">
        <Link to="/information" className="w-full h-full">
          Повернутися назад
        </Link>
      </Block>
    </Block>
  );
};

export default InformationQuestions;
