interface TestProps {
  height: string;
  text: string;
}

const TestBox: React.FC<TestProps> = ({ height, text }) => {
  return (
    <div
      className={`${height} bg-zinc-300 inline-block w-full break-inside-avoid mb-5 rounded-lg`}
    >
      {text}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex-1 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-5">
      <TestBox height="h-[250px]" text="1" />
      <TestBox height="h-[120px]" text="2" />
      <TestBox height="h-[180px]" text="3" />
      <TestBox height="h-[130px]" text="4" />
      <TestBox height="h-[270px]" text="5" />
      <TestBox height="h-[320px]" text="6" />
      <TestBox height="h-[110px]" text="7" />
      <TestBox height="h-[190px]" text="8" />
      <TestBox height="h-[210px]" text="9" />
      <TestBox height="h-[80px]" text="10" />
      <TestBox height="h-[220px]" text="11" />
      <TestBox height="h-[210px]" text="12" />
      <TestBox height="h-[100px]" text="13" />
      <TestBox height="h-[160px]" text="14" />
      <TestBox height="h-[190px]" text="15" />
      <TestBox height="h-[320px]" text="16" />
    </div>
  );
}
