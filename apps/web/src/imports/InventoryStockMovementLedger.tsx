import svgPaths from "./svg-z2n31gi8oy";
import imgImageBackgroundBorderShadow from "figma:asset/7a1d5ca4bb6c9282a5d0b7eaabfd938a725b7c96.png";

function Container1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8fed400} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(5,150,105,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Overlay">
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[35px] justify-center leading-[17.5px] not-italic relative shrink-0 text-[#0f172a] text-[14px] tracking-[-0.35px] uppercase w-[78.77px] whitespace-pre-wrap">
        <p className="mb-0">ADA CLINIC</p>
        <p>MANAGER</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Overlay />
        <Heading />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px px-[24px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
        <g id="Container">
          <path d={svgPaths.p2162b600} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[73.84px]">
        <p className="leading-[20px] whitespace-pre-wrap">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[18.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
        <g id="Container">
          <path d={svgPaths.p390b5b00} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[14px] w-[64.36px]">
        <p className="leading-[20px] whitespace-pre-wrap">Inventory</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-[rgba(5,150,105,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[18.333px] relative shrink-0 w-[14.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 18.3333">
        <g id="Container">
          <path d={svgPaths.pe400ff0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[52.83px]">
        <p className="leading-[20px] whitespace-pre-wrap">Reports</p>
      </div>
    </div>
  );
}

function Link2() {
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
    <div className="relative shrink-0 size-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
        <g id="Container">
          <path d={svgPaths.p2d4ff600} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[52.08px]">
        <p className="leading-[20px] whitespace-pre-wrap">Archive</p>
      </div>
    </div>
  );
}

function Link3() {
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
    <div className="h-[18.333px] relative shrink-0 w-[18.425px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.425 18.3333">
        <g id="Container">
          <path d={svgPaths.p70dd600} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[55.86px]">
        <p className="leading-[20px] whitespace-pre-wrap">Settings</p>
      </div>
    </div>
  );
}

function Link4() {
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

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Nav">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[24px] relative size-full">
          <Link />
          <Link1 />
          <Link2 />
          <Link3 />
          <Link4 />
        </div>
      </div>
    </div>
  );
}

function Aside() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1024px] items-start pr-px relative shrink-0 w-[256px] z-[2]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Nav />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] w-[93.63px]">
        <p className="leading-[28px] whitespace-pre-wrap">Inventory</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[15px] relative shrink-0 w-[21.5px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15">
        <g id="Margin">
          <path d={svgPaths.p3b95cda0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[190.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saturday, February 28, 2026</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Heading1 />
        <div className="bg-[#d1d5db] h-[24px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container14 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Search medicines, SKU, references...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] h-[44px] relative rounded-[9999px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[49px] pr-[17px] py-[13.5px] relative size-full">
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bottom-[22.73%] content-stretch flex flex-col items-start left-[16px] pt-px top-1/4" data-name="Container">
      <div className="flex flex-col font-['Material_Symbols_Outlined:Thin',sans-serif] h-[22px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[22px] w-[22.091px]">
        <p className="leading-[22px] whitespace-pre-wrap">search</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] max-w-[576px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] px-[32px] relative w-full">
        <Container16 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[110.95px]">
        <p className="leading-[17.5px] whitespace-pre-wrap">Clinic In-Charge</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right w-[49.39px]">
        <p className="leading-[16px] whitespace-pre-wrap">CSASHS</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-[110.95px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[17px] relative">
        <Container19 />
        <div className="bg-size-[36px_36px,auto_auto] bg-top-left relative rounded-[9999px] shrink-0 size-[40px]" data-name="Image+Background+Border+Shadow" style={{ backgroundImage: `url('${imgImageBackgroundBorderShadow}'), linear-gradient(90deg, rgb(226, 232, 240) 0%, rgb(226, 232, 240) 100%)` }}>
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <Container13 />
          <Container15 />
          <VerticalBorder />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] w-[260.45px]">
        <p className="leading-[36px] whitespace-pre-wrap">Stock Movements</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[367.48px]">
        <p className="leading-[20px] whitespace-pre-wrap">Read-only ledger of all stock changes and adjustments</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-[367.48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Heading2 />
        <Container24 />
      </div>
    </div>
  );
}

function Container26() {
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

function Button() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container26 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[76.75px]">
        <p className="leading-[20px] whitespace-pre-wrap">Export CSV</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p38ac19c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#059669] content-stretch flex gap-[8px] items-center pb-[9.5px] pt-[8.5px] px-[16px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Button">
      <Container27 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[110.5px]">
        <p className="leading-[20px] whitespace-pre-wrap">New Adjustment</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex items-end justify-between pb-[25px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container23 />
      <Container25 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 15">
        <g id="Container">
          <path d={svgPaths.p3b95cda0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[86.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">Last 30 Days</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
        <g id="Container">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-between min-w-[200px] px-[17px] py-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container29 />
      <Container32 />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Button2 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[87.47px]">
          <p className="whitespace-pre-wrap">
            <span className="leading-[20px]">{`Medicine: `}</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic text-[#0f172a]">All</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
        <g id="Container">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[40px] min-w-[180px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between min-w-[inherit] px-[17px] py-px relative size-full">
          <Container34 />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-[180px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Button3 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[59.23px]">
          <p className="whitespace-pre-wrap">
            <span className="leading-[20px]">{`Type: `}</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic text-[#0f172a]">All</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
        <g id="Container">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[40px] min-w-[180px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between min-w-[inherit] px-[17px] py-px relative size-full">
          <Container37 />
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-[180px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Button4 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[14px] text-center w-[80.58px]">
        <p className="leading-[20px] whitespace-pre-wrap">Clear Filters</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[8px] relative w-full">
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[9px] relative w-full">
          <Container28 />
          <div className="bg-[#e5e7eb] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
          <Container33 />
          <Container36 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[135.34px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[31.23px]">
        <p className="leading-[20px] whitespace-pre-wrap">Date</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[319.33px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[105.34px]">
        <p className="leading-[20px] whitespace-pre-wrap">Medicine Name</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-center px-[24px] py-[16px] relative shrink-0 w-[143.75px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[71.81px] whitespace-pre-wrap">
        <p className="mb-0">Movement</p>
        <p>Type</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[16px] relative shrink-0 w-[102.11px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[40.28px] whitespace-pre-wrap">
        <p className="mb-0">Qty In</p>
        <p>(+)</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[16px] relative shrink-0 w-[103.42px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[52.11px] whitespace-pre-wrap">
        <p className="mb-0">Qty Out</p>
        <p>(-)</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[154.05px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[69.16px]">
        <p className="leading-[20px] whitespace-pre-wrap">Reference</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative w-full">
        <Cell />
        <Cell1 />
        <Cell2 />
        <Cell3 />
        <Cell4 />
        <Cell5 />
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#f8f6f6] content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[24px] relative shrink-0 w-[135.34px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[85.09px]">
        <p className="leading-[20px] whitespace-pre-wrap">Oct 27, 2023</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[12px] text-center w-[20.14px]">
        <p className="leading-[16px] whitespace-pre-wrap">AM</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[123.81px]">
        <p className="leading-[20px] whitespace-pre-wrap">Amoxicillin 500mg</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[124.58px]">
        <p className="leading-[16px] whitespace-pre-wrap">Capsule • #SKU-9921</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[124.58px]" data-name="Container">
      <Container41 />
      <Container42 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[271.33px]" data-name="Data">
      <Background />
      <Container40 />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(58,134,255,0.1)] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px]" data-name="Overlay+Shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_rgba(58,134,255,0.2)]" />
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a86ff] text-[12px] text-center w-[12.52px]">
        <p className="leading-[16px] whitespace-pre-wrap">IN</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-center px-[24px] py-[22.5px] relative shrink-0 w-[143.75px]" data-name="Data">
      <Overlay1 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative shrink-0 w-[78.11px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[26.53px]">
        <p className="leading-[20px] whitespace-pre-wrap">500</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative shrink-0 w-[79.42px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#cbd5e1] text-[14px] text-right w-[6.45px]">
        <p className="leading-[20px] whitespace-pre-wrap">-</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[26.5px] relative shrink-0 w-[130.05px]" data-name="Data">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-right w-[57.61px]">
        <p className="leading-[16px] whitespace-pre-wrap">PO #4023</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[135.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[87.22px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 26, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f0fdfa] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d9488] text-[12px] text-center w-[11.31px]">
        <p className="leading-[16px] whitespace-pre-wrap">IB</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[116.28px]">
        <p className="leading-[20px] whitespace-pre-wrap">Ibuprofen 200mg</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[113.88px]">
        <p className="leading-[16px] whitespace-pre-wrap">Tablet • #SKU-1004</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[116.28px]" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[271.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background1 />
        <Container43 />
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px]" data-name="Overlay+Shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_rgba(42,157,143,0.2)]" />
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[12px] text-center w-[26.05px]">
        <p className="leading-[16px] whitespace-pre-wrap">OUT</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[143.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[24px] py-[22.5px] relative w-full">
        <Overlay2 />
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[78.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#cbd5e1] text-[14px] text-right w-[6.45px]">
          <p className="leading-[20px] whitespace-pre-wrap">-</p>
        </div>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[79.42px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[17.83px]">
          <p className="leading-[20px] whitespace-pre-wrap">30</p>
        </div>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[130.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[26.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-right w-[79.22px]">
          <p className="leading-[16px] whitespace-pre-wrap">Visit #1024</p>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[135.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[87.22px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 26, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f0fdfa] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d9488] text-[12px] text-center w-[15.75px]">
        <p className="leading-[16px] whitespace-pre-wrap">PA</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[135.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">Paracetamol 500mg</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[115.22px]">
        <p className="leading-[16px] whitespace-pre-wrap">Tablet • #SKU-2022</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[135.05px]" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[271.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background2 />
        <Container46 />
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px]" data-name="Overlay+Shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_rgba(42,157,143,0.2)]" />
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[12px] text-center w-[26.05px]">
        <p className="leading-[16px] whitespace-pre-wrap">OUT</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[143.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[24px] py-[22.5px] relative w-full">
        <Overlay3 />
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[78.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#cbd5e1] text-[14px] text-right w-[6.45px]">
          <p className="leading-[20px] whitespace-pre-wrap">-</p>
        </div>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[79.42px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[14.27px]">
          <p className="leading-[20px] whitespace-pre-wrap">15</p>
        </div>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[130.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[26.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-right w-[79.22px]">
          <p className="leading-[16px] whitespace-pre-wrap">Visit #1025</p>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data12 />
      <Data13 />
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[135.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[86.94px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 25, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[12px] text-center w-[12.25px]">
        <p className="leading-[16px] whitespace-pre-wrap">CI</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[140.17px]">
        <p className="leading-[20px] whitespace-pre-wrap">Ciprofloxacin 500mg</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[113.14px]">
        <p className="leading-[16px] whitespace-pre-wrap">Tablet • #SKU-8821</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[140.17px]" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[271.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background3 />
        <Container49 />
      </div>
    </div>
  );
}

function Overlay4() {
  return (
    <div className="bg-[rgba(58,134,255,0.1)] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px]" data-name="Overlay+Shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_rgba(58,134,255,0.2)]" />
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a86ff] text-[12px] text-center w-[12.52px]">
        <p className="leading-[16px] whitespace-pre-wrap">IN</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[143.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[24px] py-[22.5px] relative w-full">
        <Overlay4 />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[78.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[36.8px]">
          <p className="leading-[20px] whitespace-pre-wrap">1,000</p>
        </div>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[79.42px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#cbd5e1] text-[14px] text-right w-[6.45px]">
          <p className="leading-[20px] whitespace-pre-wrap">-</p>
        </div>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[130.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[26.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-right w-[57.61px]">
          <p className="leading-[16px] whitespace-pre-wrap">PO #4021</p>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data18 />
      <Data19 />
      <Data20 />
      <Data21 />
      <Data22 />
      <Data23 />
    </div>
  );
}

function Data24() {
  return (
    <div className="relative shrink-0 w-[135.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24.5px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[87.34px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 24, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#fff7ed] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[12px] text-center w-[17.36px]">
        <p className="leading-[16px] whitespace-pre-wrap">VC</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[122.39px]">
        <p className="leading-[20px] whitespace-pre-wrap">Vitamin C 1000mg</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[147.66px]">
        <p className="leading-[16px] whitespace-pre-wrap">Effervescent • #SKU-1120</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[147.66px]" data-name="Container">
      <Container53 />
      <Container54 />
    </div>
  );
}

function Data25() {
  return (
    <div className="relative shrink-0 w-[271.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background4 />
        <Container52 />
      </div>
    </div>
  );
}

function Overlay5() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px]" data-name="Overlay+Shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_rgba(42,157,143,0.2)]" />
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[12px] text-center w-[26.05px]">
        <p className="leading-[16px] whitespace-pre-wrap">OUT</p>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="relative shrink-0 w-[143.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[22px] pt-[22.5px] px-[24px] relative w-full">
        <Overlay5 />
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="relative shrink-0 w-[78.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[24.5px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#cbd5e1] text-[14px] text-right w-[6.45px]">
          <p className="leading-[20px] whitespace-pre-wrap">-</p>
        </div>
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="relative shrink-0 w-[79.42px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[24.5px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[8.45px]">
          <p className="leading-[20px] whitespace-pre-wrap">5</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[11.083px] relative shrink-0 w-[12.833px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 11.0833">
        <g id="Container">
          <path d={svgPaths.p2e0ed180} fill="var(--fill-0, #EA580C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#fff7ed] content-stretch flex gap-[3.99px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <Container55 />
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[12px] text-right w-[72.02px]">
        <p className="leading-[16px] whitespace-pre-wrap">Adjustment</p>
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="relative shrink-0 w-[130.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[24px] pt-[24.5px] px-[24px] relative w-full">
        <Background5 />
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data24 />
      <Data25 />
      <Data26 />
      <Data27 />
      <Data28 />
      <Data29 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Body">
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
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-px relative rounded-[inherit] w-full">
        <Header1 />
        <Body />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[189.95px]">
        <p className="whitespace-pre-wrap">
          <span className="leading-[20px]">{`Showing `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic text-[#0f172a]">1</span>
          <span className="leading-[20px]">{` to `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic text-[#0f172a]">10</span>
          <span className="leading-[20px]">{` of `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic text-[#0f172a]">97</span>
          <span className="leading-[20px]">{` results`}</span>
        </p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[10px] relative shrink-0 w-[6.167px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16667 10">
        <g id="Container">
          <path d={svgPaths.p30c9c200} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 p-[8px] rounded-bl-[6px] rounded-tl-[6px] top-0" data-name="Link">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.17px_0_0]" data-name="Link:shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_#cbd5e1]" />
      </div>
      <Container59 />
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[-1px] pb-[8.5px] pt-[7.5px] px-[16px] top-0" data-name="Link">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0" data-name="Link:shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_#cbd5e1]" />
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[8.73px]">
        <p className="leading-[20px] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="absolute bottom-0 left-[72.92px] top-0 w-[39.73px]" data-name="Link:margin">
      <Link6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[-1px] pb-[8.5px] pt-[7.5px] px-[16px] top-0" data-name="Link">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0" data-name="Link:shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_#cbd5e1]" />
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[8.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">3</p>
      </div>
    </div>
  );
}

function LinkMargin1() {
  return (
    <div className="absolute bottom-0 left-[112.65px] top-0 w-[39.92px]" data-name="Link:margin">
      <Link7 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[-1px] pb-[8.5px] pt-[7.5px] px-[16px] top-0" data-name="Container">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0" data-name="Overlay+Shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_#cbd5e1]" />
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[13.41px]">
        <p className="leading-[20px] whitespace-pre-wrap">...</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute bottom-0 left-[152.58px] top-0 w-[44.41px]" data-name="Margin">
      <Container60 />
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[-1px] pb-[8.5px] pt-[7.5px] px-[16px] top-0" data-name="Link">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0" data-name="Link:shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_#cbd5e1]" />
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[8.97px]">
        <p className="leading-[20px] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function LinkMargin2() {
  return (
    <div className="absolute bottom-0 left-[196.98px] top-0 w-[39.97px]" data-name="Link:margin">
      <Link8 />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[10px] relative shrink-0 w-[6.167px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16667 10">
        <g id="Container">
          <path d={svgPaths.p2ba68100} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[-1px] p-[8px] rounded-br-[6px] rounded-tr-[6px] top-0" data-name="Link">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.17px_0_0]" data-name="Link:shadow">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_white,inset_0px_0px_0px_1px_#cbd5e1]" />
      </div>
      <Container61 />
    </div>
  );
}

function LinkMargin3() {
  return (
    <div className="absolute bottom-0 left-[236.95px] top-0 w-[35px]" data-name="Link:margin">
      <Link9 />
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute bg-[#059669] bottom-0 content-stretch flex items-center left-[-1px] pb-[8.5px] pt-[7.5px] px-[16px] top-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[5.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">1</p>
      </div>
    </div>
  );
}

function LinkMargin4() {
  return (
    <div className="absolute bottom-0 left-[36px] top-0 w-[36.92px]" data-name="Link:margin">
      <Link10 />
    </div>
  );
}

function NavPagination() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[36px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[271.95px]" data-name="Nav - Pagination">
      <Link5 />
      <LinkMargin />
      <LinkMargin1 />
      <Margin1 />
      <LinkMargin2 />
      <LinkMargin3 />
      <LinkMargin4 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <NavPagination />
    </div>
  );
}

function Container56() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container57 />
        <Container58 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[12px] pt-[13px] px-[24px] relative w-full">
          <Container56 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Table />
        <BackgroundHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder1 />
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f8f6f6] flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Main">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[1024px] isolate items-start min-h-px min-w-px overflow-clip relative z-[1]" data-name="Container">
      <Header />
      <Main />
    </div>
  );
}

export default function InventoryStockMovementLedger() {
  return (
    <div className="bg-[#f8f6f6] content-stretch flex isolate items-start relative size-full" data-name="Inventory Stock Movement Ledger">
      <Aside />
      <Container12 />
    </div>
  );
}