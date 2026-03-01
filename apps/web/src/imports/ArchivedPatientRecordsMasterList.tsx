import svgPaths from "./svg-1rm67yfg1v";
import imgBackground from "figma:asset/e576aa594079d719d250f685e3e01f89d383d678.png";

function Container2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2cccbbb0} fill="var(--fill-0, #13ECD3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(19,236,211,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-name="Overlay">
      <Container2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] tracking-[0.35px] w-[84.41px]">
        <p className="leading-[17.5px] whitespace-pre-wrap">ADA CLINIC</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] tracking-[1px] uppercase w-[58.61px]">
        <p className="leading-[15px] whitespace-pre-wrap">Manager</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84.41px]" data-name="Container">
      <Heading />
      <Container4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[8px] relative w-full">
          <Overlay />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[73.02px]">
        <p className="leading-[21px] whitespace-pre-wrap">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container6 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p39955c80} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[54px]">
        <p className="leading-[21px] whitespace-pre-wrap">Patients</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p13144600} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[36.7px]">
        <p className="leading-[21px] whitespace-pre-wrap">Visits</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p643d217} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[63.22px]">
        <p className="leading-[21px] whitespace-pre-wrap">Inventory</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[62.11px]">
        <p className="leading-[21px] whitespace-pre-wrap">Analytics</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container14 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.pf86ae00} fill="var(--fill-0, #13ECD3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[53.05px]">
          <p className="leading-[21px] whitespace-pre-wrap">Archive</p>
        </div>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="bg-[rgba(19,236,211,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#13ecd3] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] pr-[12px] py-[10px] relative w-full">
          <Container16 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[54.92px]">
        <p className="leading-[21px] whitespace-pre-wrap">Settings</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container18 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[24px] relative size-full">
        <Margin />
        <Container5 />
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start justify-center pr-px relative shrink-0 w-[280px] z-[2]" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[30px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] tracking-[-0.6px] w-[86.73px]">
        <p className="leading-[30px] whitespace-pre-wrap">Archive</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
        <g id="Container">
          <path d={svgPaths.p841cf00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[190.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saturday, February 28, 2026</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative">
        <Heading1 />
        <div className="bg-[#e2e8f0] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container22 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Search patients, medicine...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[13px] pl-[41px] pr-[13px] pt-[12px] relative w-full">
          <Container27 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Container29 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] max-w-[576px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] px-[32px] relative w-full">
        <Container26 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[110.95px]">
        <p className="leading-[14px] whitespace-pre-wrap">Clinic In-Charge</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-center w-[49.39px]">
        <p className="leading-[16px] whitespace-pre-wrap">CSASHS</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container32 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <Container31 />
      <Margin2 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[4px] relative">
        <Container30 />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground} />
      </div>
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_0px_0px_2px_#f1f5f9] size-[40px] top-0" data-name="Overlay+Shadow" />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Background />
        <div className="absolute bg-[#2ecc71] bottom-0 right-0 rounded-[9999px] size-[12px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[9px] pr-[5px] py-[5px] relative">
        <Margin1 />
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[21px] pt-[20px] px-[32px] relative w-full">
          <Container21 />
          <Container25 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#13ecd3] text-[14px] w-[55.86px]">
          <p className="leading-[20px] whitespace-pre-wrap">Patients</p>
        </div>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(19,236,211,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#13ecd3] text-[12px] w-[20.86px]">
        <p className="leading-[16px] whitespace-pre-wrap">142</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[8px] relative">
        <Overlay1 />
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#13ecd3] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center pb-[14px] px-[4px] relative">
          <Container37 />
          <Margin3 />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[36.7px]">
          <p className="leading-[20px] whitespace-pre-wrap">Visits</p>
        </div>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center pb-[14px] px-[4px] relative">
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[68.98px]">
          <p className="leading-[20px] whitespace-pre-wrap">Medicines</p>
        </div>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center pb-[14px] px-[4px] relative">
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[34px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start relative size-full">
        <Link7 />
        <Link8 />
        <Link9 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Container36 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[95.67px] relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[64px] justify-center leading-[32px] not-italic relative shrink-0 text-[#0f172a] text-[24px] tracking-[-0.6px] w-[101.27px] whitespace-pre-wrap">
        <p className="mb-0">Archived</p>
        <p>Patients</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32px] items-start left-[599px] px-[4px] top-[4px] w-[9px]" data-name="Margin">
      <div className="bg-[#e2e8f0] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p38806900} fill="var(--fill-0, #334155)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[44.47px]">
          <p className="leading-[20px] whitespace-pre-wrap">Export</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[8px] items-center justify-center left-0 px-[17px] py-[11px] rounded-[8px] top-[calc(50%+26px)]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Search by Name or ID</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pb-[12px] pl-[40px] pr-[12px] pt-[11px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[256px]" data-name="Input">
      <Container45 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Container47 />
    </div>
  );
}

function Container44() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 top-[calc(50%-31px)]" data-name="Container">
      <Input1 />
      <Container46 />
    </div>
  );
}

function Svg() {
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

function ImageFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip pl-[89px] pr-[8px] py-[9.5px] top-0 w-[118px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container49() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16px] overflow-clip pr-[0.55px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[61.45px]">
        <p className="leading-[20px] whitespace-pre-wrap">All Types</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[118px]" data-name="Options">
      <ImageFill />
      <Container49 />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
        <g id="Container">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center px-[8px] right-0 top-0" data-name="Container">
      <Container51 />
    </div>
  );
}

function Container48() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[268px] top-[calc(50%-31px)]" data-name="Container">
      <Options />
      <Container50 />
    </div>
  );
}

function Svg1() {
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

function ImageFill1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip pl-[160px] pr-[8px] py-[9.5px] top-0 w-[189px]" data-name="image fill">
      <Svg1 />
    </div>
  );
}

function Container53() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16px] overflow-clip top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[132.63px]">
        <p className="leading-[20px] whitespace-pre-wrap">Department / Grade</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[189px]" data-name="Options">
      <ImageFill1 />
      <Container53 />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
        <g id="Container">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center px-[8px] right-0 top-0" data-name="Container">
      <Container55 />
    </div>
  );
}

function Container52() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[398px] top-[calc(50%-31px)]" data-name="Container">
      <Options1 />
      <Container54 />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[102px] relative shrink-0 w-[723.06px]" data-name="Container">
      <Margin4 />
      <Button1 />
      <Container44 />
      <Container48 />
      <Container52 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container41 />
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[141.13px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[72.44px]">
        <p className="leading-[16px] whitespace-pre-wrap">ID Number</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[212.94px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[74.06px]">
        <p className="leading-[16px] whitespace-pre-wrap">Full Name</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[119.36px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[34.05px]">
        <p className="leading-[16px] whitespace-pre-wrap">Type</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[197.08px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[62.66px]">
        <p className="leading-[16px] whitespace-pre-wrap">Context</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[154.89px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[104.22px]">
        <p className="leading-[16px] whitespace-pre-wrap">Date Archived</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[16px] relative shrink-0 w-[108.61px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right tracking-[0.6px] uppercase w-[58.69px]">
        <p className="leading-[16px] whitespace-pre-wrap">Actions</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Header">
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative shrink-0 w-[141.13px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[74.03px]">
        <p className="leading-[20px] whitespace-pre-wrap">2023-0891</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e0e7ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4338ca] text-[12px] text-center w-[15.69px]">
        <p className="leading-[16px] whitespace-pre-wrap">JD</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pr-[12px] relative shrink-0 w-[44px]" data-name="Margin">
      <Background1 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[85.88px]">
        <p className="leading-[20px] whitespace-pre-wrap">Doe, John A.</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[164.94px]" data-name="Data">
      <Margin5 />
      <Container57 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[45.56px]">
        <p className="leading-[20px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[18.5px] relative shrink-0 w-[119.36px]" data-name="Data">
      <Background2 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative shrink-0 w-[173.08px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[104.48px]">
        <p className="leading-[20px] whitespace-pre-wrap">Grade 10 - Rizal</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative shrink-0 w-[130.89px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[83.98px]">
        <p className="leading-[20px] whitespace-pre-wrap">Oct 12, 2023</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p2629bc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container58 />
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p16f48e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container59 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-[60.61px]" data-name="Data">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Row1() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pr-[24px] relative w-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
          <Data5 />
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[141.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[83.34px]">
          <p className="leading-[20px] whitespace-pre-wrap">T-2020-004</p>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#047857] text-[12px] text-center w-[19.05px]">
        <p className="leading-[16px] whitespace-pre-wrap">MS</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pr-[12px] relative shrink-0 w-[44px]" data-name="Margin">
      <Background3 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[107.5px]">
        <p className="leading-[20px] whitespace-pre-wrap">Santos, Maria L.</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[164.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Margin6 />
        <Container60 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#ecfdf5] content-stretch flex items-start px-[11px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#d1fae5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#047857] text-[12px] w-[47.3px]">
        <p className="leading-[20px] whitespace-pre-wrap">Teacher</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[119.36px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[17.5px] relative w-full">
        <BackgroundBorder />
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[173.08px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[92.36px]">
          <p className="leading-[20px] whitespace-pre-wrap">Science Dept.</p>
        </div>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[130.89px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[89.08px]">
          <p className="leading-[20px] whitespace-pre-wrap">Sep 28, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p2629bc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p16f48e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container62 />
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[60.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center justify-end relative w-full">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data6 />
          <Data7 />
          <Data8 />
          <Data9 />
          <Data10 />
          <Data11 />
        </div>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[141.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[67.88px]">
          <p className="leading-[20px] whitespace-pre-wrap">2021-1102</p>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2410c] text-[12px] text-center w-[14.91px]">
        <p className="leading-[16px] whitespace-pre-wrap">RJ</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pr-[12px] relative shrink-0 w-[44px]" data-name="Margin">
      <Background4 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[117.27px]">
        <p className="leading-[20px] whitespace-pre-wrap">Jimenez, Roberto</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[164.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Margin7 />
        <Container63 />
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[45.56px]">
        <p className="leading-[20px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[119.36px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[18.5px] relative w-full">
        <Background5 />
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[173.08px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[139.2px]">
          <p className="leading-[20px] whitespace-pre-wrap">Grade 12 - Aguinaldo</p>
        </div>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[130.89px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[85.81px]">
          <p className="leading-[20px] whitespace-pre-wrap">Sep 15, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p2629bc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container64 />
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p16f48e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container65 />
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[60.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center justify-end relative w-full">
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data12 />
          <Data13 />
          <Data14 />
          <Data15 />
          <Data16 />
          <Data17 />
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[141.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[90.69px]">
          <p className="leading-[20px] whitespace-pre-wrap">NTP-2019-02</p>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f3e8ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#7e22ce] text-[12px] text-center w-[14.08px]">
        <p className="leading-[16px] whitespace-pre-wrap">EL</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pr-[12px] relative shrink-0 w-[44px]" data-name="Margin">
      <Background6 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[68.28px]">
        <p className="leading-[20px] whitespace-pre-wrap">Lim, Elena</p>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[164.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Margin8 />
        <Container66 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#faf5ff] content-stretch flex items-start px-[11px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f3e8ff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#7e22ce] text-[12px] w-[24.78px]">
        <p className="leading-[20px] whitespace-pre-wrap">NTP</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[119.36px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[17.5px] relative w-full">
        <BackgroundBorder1 />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[173.08px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[81.63px]">
          <p className="leading-[20px] whitespace-pre-wrap">Library Staff</p>
        </div>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[130.89px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[90.36px]">
          <p className="leading-[20px] whitespace-pre-wrap">Aug 02, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p2629bc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p16f48e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container68 />
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[60.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center justify-end relative w-full">
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data18 />
          <Data19 />
          <Data20 />
          <Data21 />
          <Data22 />
          <Data23 />
        </div>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="relative shrink-0 w-[141.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[73.91px]">
          <p className="leading-[20px] whitespace-pre-wrap">2022-0012</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1d4ed8] text-[12px] text-center w-[17.34px]">
        <p className="leading-[16px] whitespace-pre-wrap">AC</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pr-[12px] relative shrink-0 w-[44px]" data-name="Margin">
      <Background7 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[74.5px]">
        <p className="leading-[20px] whitespace-pre-wrap">Cruz, Anna</p>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="relative shrink-0 w-[164.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Margin9 />
        <Container69 />
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[45.56px]">
        <p className="leading-[20px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="relative shrink-0 w-[119.36px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18px] pt-[18.5px] px-[24px] relative w-full">
        <Background8 />
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="relative shrink-0 w-[173.08px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[145.67px]">
          <p className="leading-[20px] whitespace-pre-wrap">Grade 8 - Sampaguita</p>
        </div>
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="relative shrink-0 w-[130.89px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[91.08px]">
          <p className="leading-[20px] whitespace-pre-wrap">July 20, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p2629bc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container70 />
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.p16f48e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button">
      <Container71 />
    </div>
  );
}

function Data29() {
  return (
    <div className="relative shrink-0 w-[60.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center justify-end relative w-full">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data24 />
          <Data25 />
          <Data26 />
          <Data27 />
          <Data28 />
          <Data29 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start mb-[-1px] py-px relative shrink-0 w-full" data-name="Body">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[934px] pb-px relative shrink-0 w-[934px]" data-name="Table">
      <Header1 />
      <Body />
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Table />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[189.34px]">
          <p className="whitespace-pre-wrap">
            <span className="leading-[20px]">{`Showing `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#0f172a]">1</span>
            <span className="leading-[20px]">{` to `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#0f172a]">5</span>
            <span className="leading-[20px]">{` of `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#0f172a]">142</span>
            <span className="leading-[20px]">{` results`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center w-[57.2px]">
        <p className="leading-[20px] whitespace-pre-wrap">Previous</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center w-[30.91px]">
        <p className="leading-[20px] whitespace-pre-wrap">Next</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative">
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] pt-[17px] px-[24px] relative w-full">
          <Container72 />
          <Container73 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Container56 />
        <BackgroundHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder />
      <Container40 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8f8] flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Main">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full isolate items-start min-h-px min-w-px overflow-clip relative z-[1]" data-name="Container">
      <Header />
      <Main />
    </div>
  );
}

export default function ArchivedPatientRecordsMasterList() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex isolate items-start relative size-full" data-name="Archived Patient Records Master List">
      <BackgroundVerticalBorder />
      <Container20 />
    </div>
  );
}