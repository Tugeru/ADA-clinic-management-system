import svgPaths from "./svg-hclgs9333w";
import imgImageBorderShadow from "figma:asset/4f35bdb2afb4738dda58bc8d72f6baec9a702377.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[83.64px]">
        <p className="leading-[28px] whitespace-pre-wrap">New Visit</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 15">
        <g id="Container">
          <path d={svgPaths.p3b95cda0} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[188.8px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saturday, February 28, 2026</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Heading />
        <div className="bg-[#dce3e2] h-[24px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Search patients, medicine...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[11px] pl-[41px] pr-[13px] pt-[10px] relative w-full">
          <Container6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container7 />
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] max-w-[640px] min-h-px min-w-px relative" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] px-[32px] relative w-full">
        <Container5 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[110.95px]">
        <p className="leading-[14px] whitespace-pre-wrap">Clinic In-Charge</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[49.06px]">
        <p className="leading-[16px] whitespace-pre-wrap">CSASHS</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <Container10 />
      <Margin2 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[4px] relative">
        <Container9 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="bg-size-[32px_32px] bg-top-left relative rounded-[9999px] shrink-0 size-[36px]" data-name="Image+Border+Shadow" style={{ backgroundImage: `url('${imgImageBorderShadow}')` }}>
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        </div>
        <div className="absolute bg-[#22c55e] bottom-0 right-0 rounded-[9999px] size-[10px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative">
        <Container11 />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#dce3e2] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[17px] relative">
        <Margin1 />
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#dce3e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <Container1 />
          <Margin />
          <VerticalBorder />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[30px] tracking-[-0.99px] w-full">
        <p className="leading-[37.5px] whitespace-pre-wrap">New Clinic Consultation</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Record patient visit details below. All fields marked with * are required.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[20.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5 19.5">
        <g id="Container">
          <path d={svgPaths.p2d7d8580} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container15 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[168.27px]">
          <p className="leading-[28px] whitespace-pre-wrap">Patient Information</p>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Search Patient</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">Juan Dela Cruz [2024-001]</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[41px] pr-[13px] py-[11px] relative w-full">
          <Container19 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p15494480} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bottom-[5px] content-stretch flex items-center pr-[12px] py-[9px] right-0 top-[5px]" data-name="Button">
      <Container22 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container20 />
      <Button2 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <Margin3 />
      <Container18 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.pc5c9600} fill="var(--fill-0, #238276)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#238276] text-[14px] w-[183.48px]">
          <p className="leading-[20px] whitespace-pre-wrap">Juan Dela Cruz [2024-001]</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[70.94px]">
        <p className="leading-[16px] whitespace-pre-wrap">Grade 10 - A</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] relative">
        <Background />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(42,157,144,0.1)] relative rounded-[9999px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(42,157,144,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center px-[13px] py-[7px] relative">
          <Container24 />
          <Container25 />
          <Margin4 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[34px] items-start relative shrink-0 w-full" data-name="Container">
      <OverlayBorder />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Label />
        <Container23 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading2 />
        <Container16 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2cccbbb0} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container26 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[104.83px]">
          <p className="leading-[28px] whitespace-pre-wrap">Visit Details</p>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Date</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container28 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-px items-start leading-[0] not-italic pl-px pr-[1.01px] relative self-stretch shrink-0 text-[#121716] text-[14px]" data-name="Paragraph">
      <div className="flex flex-col h-[20px] justify-center relative shrink-0 w-[14.53px]">
        <p className="leading-[20px] whitespace-pre-wrap">10</p>
      </div>
      <div className="flex flex-col h-[20px] justify-center relative shrink-0 w-[5.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">/</p>
      </div>
      <div className="flex flex-col h-[20px] justify-center relative shrink-0 w-[16.47px]">
        <p className="leading-[20px] whitespace-pre-wrap">27</p>
      </div>
      <div className="flex flex-col h-[20px] justify-center relative shrink-0 w-[5.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">/</p>
      </div>
      <div className="flex flex-col h-[20px] justify-center relative shrink-0 w-[34.56px]">
        <p className="leading-[20px] whitespace-pre-wrap">2023</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Svg() {
  return <div className="h-[13.125px] shrink-0 w-[14px]" data-name="SVG" />;
}

function ImageFill() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[2.875px] pt-[2px] px-[2px] relative shrink-0 size-[18px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[18px]" data-name="Button menu">
      <ImageFill />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container30 />
        <ButtonMenu />
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[13px] py-[9px] relative w-full">
          <Container29 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <Margin5 />
      <Input2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Time In</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container31 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative self-stretch shrink-0 text-[#121716] text-[14px] w-[69.33px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-px top-[9.5px] w-[17.52px]">
        <p className="leading-[20px] whitespace-pre-wrap">09</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[19.51px] top-[9.5px] w-[4.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">:</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[24.56px] top-[9.5px] w-[17.48px]">
        <p className="leading-[20px] whitespace-pre-wrap">30</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[46.01px] top-[9.5px] w-[22.31px]">
        <p className="leading-[20px] whitespace-pre-wrap">AM</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[0.35px] pr-[28.69px] pt-[0.34px] relative w-full">
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[13px] py-[9px] relative w-full">
          <Container32 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <Margin6 />
      <Input3 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Time Out</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container34 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative self-stretch shrink-0 text-[#121716] text-[14px] w-[50.69px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-px top-[9.5px] w-[12.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">--</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[14.89px] top-[9.5px] w-[4.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">:</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[19.93px] top-[9.5px] w-[12.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">--</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[36.79px] top-[9.5px] w-[12.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">--</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Svg1() {
  return <div className="shrink-0 size-[14.69px]" data-name="SVG" />;
}

function ImageFill1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[3px] relative shrink-0 size-[20.69px]" data-name="image fill">
      <Svg1 />
    </div>
  );
}

function ButtonMenu1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[20.69px]" data-name="Button menu">
      <ImageFill1 />
    </div>
  );
}

function ButtonMenuMargin() {
  return (
    <div className="content-stretch flex flex-col h-[20.69px] items-start pl-[8px] relative shrink-0 w-[28.69px]" data-name="Button menu:margin">
      <ButtonMenu1 />
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container36 />
        <ButtonMenuMargin />
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[13px] py-[9px] relative w-full">
          <Container35 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <Margin7 />
      <Input4 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[62.69px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start justify-center relative size-full">
        <Label1 />
        <Label2 />
        <Label3 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="whitespace-pre-wrap">
          <span className="leading-[20px]">{`Chief Complaint `}</span>
          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#e63946]">*</span>
        </p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">{`Enter details about the patient's complaint...`}</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[49px] pt-[9px] px-[13px] relative w-full">
          <Container39 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <Margin8 />
      <Textarea />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Assessment / Intervention</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">Describe the assessment and intervention taken...</p>
        </div>
      </div>
    </div>
  );
}

function Textarea1() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[49px] pt-[9px] px-[13px] relative w-full">
          <Container41 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <Margin9 />
      <Textarea1 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Remarks</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container42 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Any additional notes...</p>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[11px] pt-[10px] px-[13px] relative w-full">
          <Container43 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <Margin10 />
      <Input5 />
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Label4 />
        <Label5 />
        <Label6 />
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading3 />
        <Container27 />
        <Container37 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p3e7e25c0} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container44 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[93.92px]">
          <p className="leading-[28px] whitespace-pre-wrap">Vital Signs</p>
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Temperature (°C)</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[28px] top-[10px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[57.75px]">
        <p className="leading-[normal] whitespace-pre-wrap">e.g. 36.5</p>
      </div>
    </div>
  );
}

function Container49() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex items-center left-[13px] right-[13px] top-[9px]" data-name="Container">
      <Container49 />
      <div className="flex flex-row items-center self-stretch">
        <RectangleAlignStretch />
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-[#f6f8f8] h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container47 />
        <Container48 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <Margin11 />
      <Input6 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Blood Pressure (mmHg)</p>
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">e.g. 120/80</p>
        </div>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[11px] pt-[10px] px-[13px] relative w-full">
          <Container51 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <Margin12 />
      <Input7 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Heart Rate (bpm)</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container52 />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[28px] top-[10px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[46.25px]">
        <p className="leading-[normal] whitespace-pre-wrap">e.g. 80</p>
      </div>
    </div>
  );
}

function Container55() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px mr-[-0.01px]" data-name="Container" />;
}

function RectangleAlignStretch1() {
  return (
    <div className="content-stretch flex h-full items-start mr-[-0.01px] relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex items-center left-[13px] pr-[0.01px] right-[13px] top-[9px]" data-name="Container">
      <Container55 />
      <div className="flex flex-row items-center self-stretch">
        <RectangleAlignStretch1 />
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-[#f6f8f8] h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container53 />
        <Container54 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Label">
      <Margin13 />
      <Input8 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[62px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start justify-center relative size-full">
        <Label7 />
        <Label8 />
        <Label9 />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading4 />
        <Container45 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.pf1b7680} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <Container57 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[203.33px]">
        <p className="leading-[28px] whitespace-pre-wrap">Medicine Administered</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p3a7f8c20} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Container58 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[14px] text-center w-[92.3px]">
        <p className="leading-[20px] whitespace-pre-wrap">Add Medicine</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Heading5 />
        <Button3 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[427.83px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[74.19px]">
        <p className="leading-[16px] whitespace-pre-wrap">Item Name</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[239.33px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[68.39px]">
        <p className="leading-[16px] whitespace-pre-wrap">Quantity</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0 w-[50.83px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] text-center tracking-[0.6px] uppercase w-[50.28px]">
        <p className="leading-[16px] whitespace-pre-wrap">Action</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-center px-[4px] relative size-full">
          <Container61 />
          <Container62 />
          <Container63 />
        </div>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d="M6.3 8.4L10.5 12.6L14.7 8.4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[387.33px] pr-[9px] py-[8.5px] top-0 w-[417.33px]" data-name="image fill">
      <Svg2 />
    </div>
  );
}

function Container64() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[13px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[177.94px]">
        <p className="leading-[20px] whitespace-pre-wrap">Paracetamol 500mg Tablet</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white h-[38px] relative rounded-[6px] shrink-0 w-[417.33px]" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ImageFill2 />
        <Container64 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">1</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container68 />
    </div>
  );
}

function RectangleAlignStretch2() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container67 />
        <div className="flex flex-row items-center self-stretch">
          <RectangleAlignStretch2 />
        </div>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[13px] py-[9px] relative w-full">
          <Container66 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[20.55px]">
        <p className="leading-[16px] whitespace-pre-wrap">pcs</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-[233.33px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Input9 />
        <Container69 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.pd83d200} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container71 />
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-[49.33px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pt-[10px] relative w-full">
        <Button4 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-center p-[13px] relative w-full">
          <Options />
          <Container65 />
          <Container70 />
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d="M6.3 8.4L10.5 12.6L14.7 8.4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[387.33px] pr-[9px] py-[8.5px] top-0 w-[417.33px]" data-name="image fill">
      <Svg3 />
    </div>
  );
}

function Container73() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[13px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[121.63px]">
        <p className="leading-[20px] whitespace-pre-wrap">Amoxicillin 500mg</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-white h-[38px] relative rounded-[6px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e63946] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <ImageFill3 />
      <Container73 />
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p308a4a00} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] w-[239.03px]">
        <p className="leading-[16px] whitespace-pre-wrap">Quantity exceeds available stock (Max: 5)</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-[417.33px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative w-full">
        <Options1 />
        <Container74 />
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">10</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container79 />
    </div>
  );
}

function RectangleAlignStretch3() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container78 />
        <div className="flex flex-row items-center self-stretch">
          <RectangleAlignStretch3 />
        </div>
      </div>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[13px] py-[9px] relative w-full">
          <Container77 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e63946] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[20.55px]">
        <p className="leading-[16px] whitespace-pre-wrap">pcs</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-[233.33px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Input10 />
        <Container80 />
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.pd83d200} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container82 />
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 w-[49.33px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pt-[10px] relative w-full">
        <Button5 />
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(230,57,70,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(230,57,70,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-start justify-center p-[13px] relative w-full">
          <Container72 />
          <Container76 />
          <Container81 />
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Container60 />
        <BackgroundBorder />
        <OverlayBorder1 />
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Container56 />
        <Container59 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p3e9df400} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container83 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[99.03px]">
          <p className="leading-[28px] whitespace-pre-wrap">Disposition</p>
        </div>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[118.56px]">
          <p className="leading-[20px] whitespace-pre-wrap">Returned to Class</p>
        </div>
      </div>
    </div>
  );
}

function Label10() {
  return (
    <div className="relative rounded-[8px] self-stretch shrink-0 w-[233.33px]" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[13px] relative size-full">
          <div className="bg-white relative rounded-[16px] shrink-0 size-[16px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[16px]" />
          </div>
          <Container85 />
        </div>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3851da00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Svg4 />
      </div>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-[#2a9d90] relative rounded-[16px] shrink-0 size-[18px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <ImageFill4 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[14px] w-[74.83px]">
          <p className="leading-[20px] whitespace-pre-wrap">Sent Home</p>
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute right-[2px] size-[21.333px] top-[2px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3333 21.3333">
        <g id="Container">
          <path d={svgPaths.pb266400} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label11() {
  return (
    <div className="bg-[rgba(42,157,144,0.05)] relative rounded-[8px] self-stretch shrink-0 w-[235.33px]" data-name="Label">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[11px] items-center pl-[13px] pr-[118.5px] py-[14px] relative size-full">
          <Input11 />
          <Container86 />
          <Container87 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2a9d90] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[133.34px]">
          <p className="leading-[20px] whitespace-pre-wrap">Referred to Hospital</p>
        </div>
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="relative rounded-[8px] self-stretch shrink-0 w-[233.33px]" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[13px] relative size-full">
          <div className="bg-white relative rounded-[16px] shrink-0 size-[16px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[16px]" />
          </div>
          <Container88 />
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start justify-center relative size-full">
        <Label10 />
        <Label11 />
        <Label12 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div aria-hidden="true" className="absolute border-[#dce3e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[9px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] tracking-[0.7px] uppercase w-[216.5px]">
          <p className="leading-[20px] whitespace-pre-wrap">Released-To Information</p>
        </div>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Guardian Name</p>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container90 />
    </div>
  );
}

function Container91() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">e.g. Maria Dela Cruz</p>
        </div>
      </div>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[11px] pt-[10px] px-[13px] relative w-full">
          <Container91 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-[362px] top-0" data-name="Label">
      <Margin14 />
      <Input12 />
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Relationship</p>
      </div>
    </div>
  );
}

function Margin15() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container92 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d="M6.3 8.4L10.5 12.6L14.7 8.4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[316px] pr-[9px] py-[8.5px] top-0 w-[346px]" data-name="image fill">
      <Svg5 />
    </div>
  );
}

function Container93() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[13px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[125.7px]">
        <p className="leading-[20px] whitespace-pre-wrap">Select Relationship</p>
      </div>
    </div>
  );
}

function Options2() {
  return (
    <div className="bg-white h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill5 />
      <Container93 />
    </div>
  );
}

function Label14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[362px] right-0 top-0" data-name="Label">
      <Margin15 />
      <Options2 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Release Time</p>
      </div>
    </div>
  );
}

function Margin16() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container94 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative self-stretch shrink-0 text-[#121716] text-[14px] w-[66.34px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-px top-[9.5px] w-[14.53px]">
        <p className="leading-[20px] whitespace-pre-wrap">10</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[16.53px] top-[9.5px] w-[4.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">:</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[21.58px] top-[9.5px] w-[17.48px]">
        <p className="leading-[20px] whitespace-pre-wrap">30</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[43.03px] top-[9.5px] w-[22.31px]">
        <p className="leading-[20px] whitespace-pre-wrap">AM</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Svg6() {
  return <div className="shrink-0 size-[14.69px]" data-name="SVG" />;
}

function ImageFill6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[3px] relative shrink-0 size-[20.69px]" data-name="image fill">
      <Svg6 />
    </div>
  );
}

function ButtonMenu2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[20.69px]" data-name="Button menu">
      <ImageFill6 />
    </div>
  );
}

function ButtonMenuMargin1() {
  return (
    <div className="content-stretch flex flex-col h-[20.69px] items-start pl-[8px] relative shrink-0 w-[28.69px]" data-name="Button menu:margin">
      <ButtonMenu2 />
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container96 />
        <ButtonMenuMargin1 />
      </div>
    </div>
  );
}

function Input13() {
  return (
    <div className="bg-white max-w-[200px] relative rounded-[8px] shrink-0 w-[200px]" data-name="Input">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] overflow-clip px-[13px] py-[9px] relative rounded-[inherit] w-full">
        <Container95 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[78px]" data-name="Label">
      <Margin16 />
      <Input13 />
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[140.69px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Label13 />
        <Label14 />
        <Label15 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-[21px] pt-[29px] px-[21px] relative w-full">
        <Heading7 />
        <Container89 />
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[#dce3e2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading6 />
        <Container84 />
        <BackgroundBorder1 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] text-center w-[47.58px]">
        <p className="leading-[20px] whitespace-pre-wrap">Cancel</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p3e09ad60} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#2a9d90] content-stretch flex gap-[7.99px] items-center justify-center px-[32px] py-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_-0.03px_0_0] rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(42,157,144,0.2),0px_4px_6px_-4px_rgba(42,157,144,0.2)]" data-name="Button:shadow" />
      <Container98 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[102.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">{`Save & Finalize`}</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Button6 />
      <Button7 />
    </div>
  );
}

function Margin17() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] pt-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container97 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Form">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Margin17 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-full max-w-[800px] relative shrink-0 w-[800px]" data-name="Container">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] pb-[80px] relative size-full">
        <Container13 />
        <Form />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8f8] flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Main">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[40px] pt-[39px] px-[40px] relative size-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[2040px] isolate items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Header />
      <Main />
    </div>
  );
}

function Container100() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8fed400} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[62.48px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#2a9d90] text-[20px] tracking-[-0.5px] w-[112.5px] whitespace-pre-wrap">
        <p className="mb-0">ADA CLINIC</p>
        <p>MANAGER</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Container100 />
        <Container101 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#dce3e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px px-[24px] relative size-full">
          <Container99 />
        </div>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[73.02px]">
        <p className="leading-[20px] whitespace-pre-wrap">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container102 />
          <Container103 />
        </div>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p39955c80} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[54px]">
        <p className="leading-[20px] whitespace-pre-wrap">Patients</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container104 />
          <Container105 />
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2cccbbb0} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[14px] w-[38.75px]">
        <p className="leading-[20px] whitespace-pre-wrap">Visits</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[rgba(42,157,144,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container106 />
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p643d217} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[63.22px]">
        <p className="leading-[20px] whitespace-pre-wrap">Inventory</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container108 />
          <Container109 />
        </div>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[62.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">Analytics</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container110 />
          <Container111 />
        </div>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p1f1e400} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[51.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">Archive</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container112 />
          <Container113 />
        </div>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[54.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">Settings</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container114 />
          <Container115 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Nav">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[24px] relative size-full">
          <Link />
          <Link1 />
          <Link2 />
          <Link3 />
          <Link4 />
          <Link5 />
          <Link6 />
        </div>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 10.5">
        <g id="Container">
          <path d={svgPaths.p880e780} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(42,157,144,0.2)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Overlay">
      <Container116 />
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[12px] w-[67.5px]">
        <p className="leading-[16px] whitespace-pre-wrap">Need Help?</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] w-[77.72px]">
        <p className="leading-[15px] whitespace-pre-wrap">Contact Support</p>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[77.72px]" data-name="Container">
      <Container118 />
      <Container119 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f6f8f8] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
          <Overlay />
          <Container117 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#dce3e2] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] pt-[17px] px-[16px] relative w-full">
        <Background1 />
      </div>
    </div>
  );
}

function Aside() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[2040px] items-start left-0 pr-px top-0 w-[256px]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[#dce3e2] border-r border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Nav />
      <HorizontalBorder1 />
    </div>
  );
}

export default function NewConsultationAndVisitForm() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex items-start justify-center pl-[256px] relative size-full" data-name="New Consultation and Visit Form">
      <Container />
      <Aside />
    </div>
  );
}