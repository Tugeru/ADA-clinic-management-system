import svgPaths from "./svg-70ow8ynhrt";
import imgProfile from "figma:asset/52a7c8b613dd708a7fa1c03a84803caafdcde10b.png";

function Container1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8fed400} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-name="Overlay">
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] tracking-[-0.45px] w-[37.78px]">
        <p className="leading-[22.5px] whitespace-pre-wrap">ADA</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] tracking-[1px] uppercase w-[101.66px]">
        <p className="leading-[15px] whitespace-pre-wrap">Clinic Manager</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[101.66px]" data-name="Container">
      <Heading />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[24px] relative w-full">
          <Overlay />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p191dcc80} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[14px] w-[73.84px]">
        <p className="leading-[20px] whitespace-pre-wrap">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
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
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
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
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p3c95900} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[36.7px]">
        <p className="leading-[20px] whitespace-pre-wrap">Visits</p>
      </div>
    </div>
  );
}

function Link2() {
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
          <path d={svgPaths.p643d217} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
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
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p19344b40} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
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
          <path d={svgPaths.pf86ae00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
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
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
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
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Container16 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Nav">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[8px] relative size-full">
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

function Aside() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start pr-px relative shrink-0 w-[256px] z-[2]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]" />
      <Container />
      <Nav />
      <div className="h-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
        <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[20px] w-[106.66px]">
        <p className="leading-[28px] whitespace-pre-wrap">Dashboard</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start px-[8px] relative shrink-0 w-[17px]" data-name="Margin">
      <div className="bg-[#d1d5db] h-[16px] shrink-0 w-px" data-name="Vertical Divider" />
    </div>
  );
}

function Container20() {
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

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[152.44px]">
        <p className="leading-[20px] whitespace-pre-wrap">Sunday, March 1, 2026</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Heading1 />
        <Margin />
        <Container19 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Search patients, medicine...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f4f6f8] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[10px] pl-[40px] pr-[12px] pt-[9px] relative w-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p2dbaedc0} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-[320px]" data-name="Container">
      <Input />
      <Container25 />
    </div>
  );
}

function Profile() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProfile} />
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shadow-[0px_0px_0px_2px_white,0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[32px]" data-name="Background+Shadow">
      <Profile />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[12px] w-[95.11px]">
        <p className="leading-[12px] whitespace-pre-wrap">Clinic In-Charge</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[13px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] w-[40.89px]">
        <p className="leading-[12.5px] whitespace-pre-wrap">CSASHS</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[95.11px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
        <g id="Container">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[12px] items-center p-[6px] relative rounded-[9999px] shrink-0" data-name="Button">
      <BackgroundShadow />
      <Container27 />
      <Container30 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] max-w-[672px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-end max-w-[inherit] relative w-full">
        <Container23 />
        <Button />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[32px] relative size-full">
          <Container18 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[103.34px]">
        <p className="leading-[16px] whitespace-pre-wrap">{`Today's Visits`}</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[30px] w-[39.19px]">
        <p className="leading-[36px] whitespace-pre-wrap">42</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[103.34px]" data-name="Container">
      <Container34 />
      <Heading2 />
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p13144600} fill="var(--fill-0, #3A86FF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(58,134,255,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container35 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <Container33 />
        <Overlay1 />
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[7px] relative shrink-0 w-[13.667px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6667 7">
        <g id="Margin">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #2ECC71)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin1 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ecc71] text-[12px] w-[27.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">+5%</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[6px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[72.08px]">
        <p className="leading-[16px] whitespace-pre-wrap">vs yesterday</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container37 />
        <Margin2 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container32 />
        <Container36 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[159.55px]">
        <p className="leading-[16px] whitespace-pre-wrap">Total Active Patients</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[30px] w-[82.38px]">
        <p className="leading-[36px] whitespace-pre-wrap">1,204</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[159.55px]" data-name="Container">
      <Container40 />
      <Heading3 />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[12px] relative shrink-0 w-[24px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 12">
        <g id="Container">
          <path d={svgPaths.p5df3d80} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container41 />
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <Container39 />
        <Overlay2 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[7px] relative shrink-0 w-[13.667px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6667 7">
        <g id="Margin">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #2ECC71)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin3 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ecc71] text-[12px] w-[33.08px]">
        <p className="leading-[16px] whitespace-pre-wrap">+12%</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[6px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[75.56px]">
        <p className="leading-[16px] whitespace-pre-wrap">vs last month</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container43 />
        <Margin4 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container38 />
        <Container42 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[121.92px]">
        <p className="leading-[16px] whitespace-pre-wrap">Low Stock Items</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[30px] w-[19.53px]">
        <p className="leading-[36px] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[121.92px]" data-name="Container">
      <Container46 />
      <Heading4 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[21px] relative shrink-0 w-[20.7px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7 21">
        <g id="Container">
          <path d={svgPaths.p3c14dcb0} fill="var(--fill-0, #F4A261)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(244,162,97,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container47 />
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <Container45 />
        <Overlay3 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Needs Attention</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container49 />
      </div>
    </div>
  );
}

function BackgroundVerticalBorderShadow() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+VerticalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#f4a261] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pl-[28px] pr-[24px] py-[24px] relative size-full">
        <Container44 />
        <Container48 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[117.48px]">
        <p className="leading-[16px] whitespace-pre-wrap">Total Medicines</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[30px] w-[57.52px]">
        <p className="leading-[36px] whitespace-pre-wrap">356</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[117.48px]" data-name="Container">
      <Container52 />
      <Heading5 />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
        <g id="Container">
          <path d={svgPaths.p3be98a0} fill="var(--fill-0, #2ECC71)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay4() {
  return (
    <div className="bg-[rgba(46,204,113,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container53 />
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <Container51 />
        <Overlay4 />
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[15.667px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6667 11.6667">
        <g id="Margin">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #2ECC71)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin5 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ecc71] text-[12px] w-[104.56px]">
        <p className="leading-[16px] whitespace-pre-wrap">Inventory Healthy</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container55 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container50 />
        <Container54 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[138px] items-start justify-center left-[32px] right-[32px] top-[32px]" data-name="Container">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundVerticalBorderShadow />
      <BackgroundBorderShadow2 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[212.48px]">
          <p className="leading-[28px] whitespace-pre-wrap">{`Today's Visits Overview`}</p>
        </div>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[14px] w-[55.66px]">
          <p className="leading-[20px] whitespace-pre-wrap">View All</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[21px] pt-[20px] px-[24px] relative w-full">
          <Heading6 />
          <Link7 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[114.45px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] tracking-[1px] uppercase w-[44.67px]">
        <p className="leading-[normal] whitespace-pre-wrap">Time In</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[187.31px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] tracking-[1px] uppercase w-[86.94px]">
        <p className="leading-[normal] whitespace-pre-wrap">Patient Name</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[137.06px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] tracking-[1px] uppercase w-[70.13px]">
        <p className="leading-[normal] whitespace-pre-wrap">Complaint</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[182.45px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] tracking-[1px] uppercase w-[75.94px]">
        <p className="leading-[normal] whitespace-pre-wrap">Disposition</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-center px-[24px] py-[16px] relative shrink-0 w-[134.05px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] text-center tracking-[1px] uppercase w-[45.39px]">
        <p className="leading-[normal] whitespace-pre-wrap">Status</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[rgba(249,250,251,0.5)] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[114.45px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[64.8px]">
        <p className="leading-[20px] whitespace-pre-wrap">08:15 AM</p>
      </div>
    </div>
  );
}

function Overlay5() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Overlay">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[10px] text-center w-[13.08px]">
        <p className="leading-[20px] whitespace-pre-wrap">AA</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[63.88px]">
        <p className="leading-[20px] whitespace-pre-wrap">Abbegail D. Abebon</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[139.31px]" data-name="Data">
      <Overlay5 />
      <Container57 />
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[137.06px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[67.44px]">
        <p className="leading-[20px] whitespace-pre-wrap">Headache</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pr-[24px] pt-[25.5px] relative shrink-0 w-[158.45px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[124.47px]">
        <p className="leading-[20px] whitespace-pre-wrap">Given Paracetamol</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex items-center justify-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#15803d] text-[10px] text-center uppercase w-[62.61px]">
        <p className="leading-[20px] whitespace-pre-wrap">Completed</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[24.5px] pr-[24px] pt-[24px] relative shrink-0 w-[110.05px]" data-name="Data">
      <Background1 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[114.45px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pt-[20px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#121716] text-[14px] w-[41.69px] whitespace-pre-wrap">
          <p className="mb-0">09:30</p>
          <p>AM</p>
        </div>
      </div>
    </div>
  );
}

function Overlay6() {
  return (
    <div className="bg-[rgba(58,134,255,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Overlay">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a86ff] text-[10px] text-center w-[12.41px]">
        <p className="leading-[20px] whitespace-pre-wrap">JS</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[74.59px]">
        <p className="leading-[20px] whitespace-pre-wrap">Jane Smith</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[139.31px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Overlay6 />
        <Container58 />
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[137.06px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pt-[20px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#678380] text-[14px] w-[58.23px] whitespace-pre-wrap">
          <p className="mb-0">Stomach</p>
          <p>Pain</p>
        </div>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[158.45px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[31px] pr-[24px] pt-[30px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[83.7px]">
          <p className="leading-[20px] whitespace-pre-wrap">Rest at clinic</p>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#fef9c3] content-stretch flex items-center justify-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#a16207] text-[10px] text-center uppercase w-[66.02px]">
        <p className="leading-[20px] whitespace-pre-wrap">Monitoring</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[110.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pr-[24px] py-[28.5px] relative w-full">
        <Background2 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data5 />
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[114.45px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[31px] pt-[30px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[65.14px]">
          <p className="leading-[20px] whitespace-pre-wrap">10:45 AM</p>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#fee2e2] content-stretch flex h-[32px] items-center justify-center relative rounded-[9999px] shrink-0 w-[31.14px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#dc2626] text-[10px] text-center w-[15.94px]">
        <p className="leading-[20px] whitespace-pre-wrap">MB</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[43.65px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#121716] text-[14px] w-[52.52px] whitespace-pre-wrap">
        <p className="mb-0">Michael</p>
        <p>Brown</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[139.31px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background3 />
        <Container59 />
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[137.06px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[31px] pt-[30px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[71.23px]">
          <p className="leading-[20px] whitespace-pre-wrap">High Fever</p>
        </div>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[158.45px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[31px] pr-[24px] pt-[30px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[71.05px]">
          <p className="leading-[20px] whitespace-pre-wrap">Sent home</p>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex items-center justify-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#374151] text-[10px] text-center uppercase w-[59.86px]">
        <p className="leading-[20px] whitespace-pre-wrap">Sent Home</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[110.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pr-[24px] py-[28.5px] relative w-full">
        <Background4 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
      <Data14 />
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[114.45px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[30.5px] pt-[30px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[61.83px]">
          <p className="leading-[20px] whitespace-pre-wrap">11:20 AM</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f3e8ff] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9333ea] text-[10px] text-center w-[13.3px]">
        <p className="leading-[20px] whitespace-pre-wrap">ED</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[76.77px]">
        <p className="leading-[20px] whitespace-pre-wrap">Emily Davis</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[139.31px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background5 />
        <Container60 />
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[137.06px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[30.5px] pt-[30px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[14px] w-[65px]">
          <p className="leading-[20px] whitespace-pre-wrap">Minor Cut</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[158.45px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#678380] text-[14px] w-[67.75px] whitespace-pre-wrap">
          <p className="mb-0">{`Cleaned &`}</p>
          <p>Bandaged</p>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex items-center justify-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#15803d] text-[10px] text-center uppercase w-[62.61px]">
        <p className="leading-[20px] whitespace-pre-wrap">Completed</p>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[110.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[28px] pr-[24px] pt-[28.5px] relative w-full">
        <Background6 />
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] self-stretch shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)] shrink-0 w-[755.33px]" data-name="Background+Shadow">
      <BackgroundHorizontalBorder />
      <Table />
    </div>
  );
}

function Heading7() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[148.34px]">
          <p className="leading-[28px] whitespace-pre-wrap">Low Stock Alerts</p>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[19px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 19">
        <g id="Container">
          <path d={svgPaths.p7555480} fill="var(--fill-0, #F4A261)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[21px] pt-[20px] px-[24px] relative w-full">
          <Heading7 />
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 15">
        <g id="Container">
          <path d={svgPaths.p34f54700} fill="var(--fill-0, #F4A261)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(244,162,97,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container64 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[138.25px]">
        <p className="leading-[17.5px] whitespace-pre-wrap">Paracetamol 500mg</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] w-[72.09px]">
        <p className="leading-[15px] whitespace-pre-wrap">Threshold: 100</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[138.25px]" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <BackgroundBorderShadow3 />
        <Container65 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[20px] text-right w-[25.97px]">
        <p className="leading-[20px] whitespace-pre-wrap">45</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[9px] text-right uppercase w-[44.81px]">
        <p className="leading-[13.5px] whitespace-pre-wrap">On-hand</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-[44.81px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container69 />
        <Container70 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(244,162,97,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(244,162,97,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[17px] relative w-full">
          <Container63 />
          <Container68 />
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[17.083px] relative shrink-0 w-[15.833px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8333 17.0833">
        <g id="Container">
          <path d={svgPaths.p13350f00} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow4() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(230,57,70,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container72 />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[75.58px]">
        <p className="leading-[17.5px] whitespace-pre-wrap">Amoxicillin</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] w-[67.39px]">
        <p className="leading-[15px] whitespace-pre-wrap">Threshold: 50</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[75.58px]" data-name="Container">
      <Container74 />
      <Container75 />
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <BackgroundBorderShadow4 />
        <Container73 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[20px] text-right w-[21.23px]">
        <p className="leading-[20px] whitespace-pre-wrap">12</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[9px] text-right uppercase w-[41.86px]">
        <p className="leading-[13.5px] whitespace-pre-wrap">Critical</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-[41.86px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(230,57,70,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(230,57,70,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[17px] relative w-full">
          <Container71 />
          <Container76 />
        </div>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 size-[16.625px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.625 16.625">
        <g id="Container">
          <path d={svgPaths.p2afb5a00} fill="var(--fill-0, #F4A261)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow5() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(244,162,97,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container80 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] w-[79.33px]">
        <p className="leading-[17.5px] whitespace-pre-wrap">Bandages L</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[10px] w-[67.5px]">
        <p className="leading-[15px] whitespace-pre-wrap">Threshold: 20</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[79.33px]" data-name="Container">
      <Container82 />
      <Container83 />
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <BackgroundBorderShadow5 />
        <Container81 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[20px] text-right w-[21.08px]">
        <p className="leading-[20px] whitespace-pre-wrap">15</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[9px] text-right uppercase w-[44.81px]">
        <p className="leading-[13.5px] whitespace-pre-wrap">On-hand</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 w-[44.81px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container85 />
        <Container86 />
      </div>
    </div>
  );
}

function OverlayBorder2() {
  return (
    <div className="bg-[rgba(244,162,97,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(244,162,97,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[17px] relative w-full">
          <Container79 />
          <Container84 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-px py-[13px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(42,157,143,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[12px] text-center tracking-[1.2px] uppercase w-[147.17px]">
        <p className="leading-[16px] whitespace-pre-wrap">Manage Inventory</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
        <OverlayBorder />
        <OverlayBorder1 />
        <OverlayBorder2 />
        <ButtonMargin />
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] self-stretch shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)] shrink-0 w-[365.66px]" data-name="Background+Shadow">
      <HorizontalBorder />
      <Container62 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[437px] items-start justify-center left-[32px] right-[32px] top-[206px]" data-name="Container">
      <BackgroundShadow1 />
      <BackgroundShadow2 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-[189.53px]">
        <p className="leading-[28px] whitespace-pre-wrap">Most Used Medicines</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d="M5.4 7.2L9 10.8L12.6 7.2" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[30px] items-start justify-center left-0 overflow-clip pl-[75px] pr-[9px] py-[6px] top-0 w-[102px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container89() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-[75.77px]">
        <p className="leading-[16px] whitespace-pre-wrap">Last 30 Days</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#f9fafb] h-[30px] relative rounded-[8px] shrink-0 w-[102px]" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill />
      <Container89 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Options />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[97.95px]">
        <p className="leading-[16px] whitespace-pre-wrap">Paracetamol</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[12px] tracking-[0.6px] uppercase w-[68.3px]">
        <p className="leading-[16px] whitespace-pre-wrap">245 units</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container93 />
        <Container94 />
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f3f4f6] h-[10px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#2a9d8f] h-[10px] left-0 right-[15%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Background7 />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[73.88px]">
        <p className="leading-[16px] whitespace-pre-wrap">Ibuprofen</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[12px] tracking-[0.6px] uppercase w-[66.42px]">
        <p className="leading-[16px] whitespace-pre-wrap">180 units</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container97 />
        <Container98 />
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f3f4f6] h-[10px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#2a9d8f] h-[10px] left-0 opacity-80 right-[35%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container96 />
      <Background8 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[72.58px]">
        <p className="leading-[16px] whitespace-pre-wrap">Cetirizine</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[12px] tracking-[0.6px] uppercase w-[66.17px]">
        <p className="leading-[16px] whitespace-pre-wrap">120 units</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container101 />
        <Container102 />
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f3f4f6] h-[10px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#2a9d8f] h-[10px] left-0 opacity-60 right-[55%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container100 />
      <Background9 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[113.38px]">
        <p className="leading-[16px] whitespace-pre-wrap">Alcohol Swabs</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[12px] tracking-[0.6px] uppercase w-[60.02px]">
        <p className="leading-[16px] whitespace-pre-wrap">95 units</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container105 />
        <Container106 />
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f3f4f6] h-[10px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#2a9d8f] h-[10px] left-0 opacity-40 right-[65%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container104 />
      <Background10 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Container91 />
      <Container95 />
      <Container99 />
      <Container103 />
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)] shrink-0 w-[755.33px]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[32px] relative size-full">
        <Container88 />
        <Container90 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[18px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Quick Actions</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading9 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] w-full">
        <p className="leading-[19.5px] whitespace-pre-wrap">Frequently used tasks for the clinic operations.</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container107 />
    </div>
  );
}

function Container109() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2d8e4cc0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2a9d8f] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center p-[16px] relative w-full">
          <Container109 />
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[116.73px]">
            <p className="leading-[20px] whitespace-pre-wrap">New Visit Record</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.pe7a2f00} fill="var(--fill-0, #3A86FF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[11.99px] items-center justify-center p-[17px] relative w-full">
          <Container110 />
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] text-center w-[113.27px]">
            <p className="leading-[20px] whitespace-pre-wrap">Add New Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.55px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.55 20">
        <g id="Container">
          <path d={svgPaths.p1439fe00} fill="var(--fill-0, #F4A261)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[11.99px] items-center justify-center p-[17px] relative w-full">
          <Container111 />
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#121716] text-[14px] text-center w-[123.77px]">
            <p className="leading-[20px] whitespace-pre-wrap">Stock-in Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container113() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p256c25e0} fill="var(--fill-0, #678380)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] tracking-[0.6px] uppercase w-[177.3px]">
        <p className="leading-[16px] whitespace-pre-wrap">Need Help? View Manual</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Container113 />
        <Link8 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[25px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Container112 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <HorizontalBorder1 />
    </div>
  );
}

function BackgroundShadow4() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[381px] items-start p-[32px] relative rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.05)] shrink-0 w-[366px]" data-name="Background+Shadow">
      <Heading3Margin />
      <Margin6 />
      <Container108 />
      <Margin7 />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start justify-center left-[32px] right-[32px] top-[675px]" data-name="Container">
      <BackgroundShadow3 />
      <BackgroundShadow4 />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[1195.5px]" data-name="Footer">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#678380] text-[12px] text-center w-[486.39px]">
        <p className="leading-[16px] whitespace-pre-wrap">© 2023 ADA Clinic Management System. Cabantian Stand Alone Senior High School.</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f4f6f8] flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Background">
      <Container31 />
      <Container56 />
      <Container87 />
      <Footer />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full isolate items-start min-h-px min-w-px overflow-clip relative z-[1]" data-name="Main">
      <Header />
      <Background />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-[#f4f6f8] content-stretch flex isolate items-start relative size-full" data-name="Dashboard">
      <Aside />
      <Main />
    </div>
  );
}