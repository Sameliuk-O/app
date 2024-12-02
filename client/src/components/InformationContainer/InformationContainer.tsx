import { InformationLinkBlock } from "@/components/InformationLinkBlock";

interface InformationContainer {
  headerText: string;
  blockIcon: string;
  blockLink: string;
  blockText: string;
}

const InformationContainer = (props: InformationContainer) => {
  const { headerText, blockText, blockLink, blockIcon } = props;

  return (
    <section className="gap-y-5 pb-5 border-b border-dashed border-gray200">
      <h2 className="text-xl text-gray500 my-2.5 sm:mx-3 lg:mx-6 lg:text-3xl">
        {headerText}
      </h2>
      <InformationLinkBlock
        link={blockLink}
        icon={blockIcon}
        text={blockText}
      />
    </section>
  );
};

export default InformationContainer;
