import svgPaths from "./svg-kyxota5cdn";
import imgImageBorder from "figma:asset/eae03a9b3c29cc2f79fda71a5d6a7c369b836740.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] tracking-[0.4px] w-[186.02px]">
        <p className="leading-[24px] whitespace-pre-wrap">ADA CLINIC MANAGER</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[186.02px]" data-name="Container">
      <Heading />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-[24px] relative w-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[73.02px]">
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
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p39955c80} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[54px]">
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
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.pe049700} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[14px] w-[36.7px]">
        <p className="leading-[20px] whitespace-pre-wrap">Visits</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[rgba(42,157,143,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
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
    <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
        <g id="Container">
          <path d={svgPaths.p3be98a0} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[63.22px]">
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
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[62.11px]">
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
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.pf86ae00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[51.11px]">
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
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[54.92px]">
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
          <Container14 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="relative shrink-0 w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[8px] relative w-full">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />
        <Link6 />
      </div>
    </div>
  );
}

function Aside() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start pr-px relative shrink-0 w-[256px]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none" />
      <Container />
      <Nav />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[25px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] w-[55.36px]">
        <p className="leading-[25px] whitespace-pre-wrap">Visits</p>
      </div>
    </div>
  );
}

function Container18() {
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

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[190.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saturday, February 28, 2026</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Heading1 />
        <div className="bg-[#e2e8f0] h-[24px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container17 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
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
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[13px] pl-[41px] pr-[17px] pt-[12px] relative w-full">
          <Container21 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p2dbaedc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container22 />
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] max-w-[640px] min-h-px min-w-px relative" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] px-[32px] relative w-full">
        <Container20 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[109.73px]">
        <p className="leading-[20px] whitespace-pre-wrap">Clinic In-Charge</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right w-[49.06px]">
        <p className="leading-[16px] whitespace-pre-wrap">CSASHS</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-[109.73px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Container27() {
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
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative">
        <Container27 />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[17px] relative">
        <Container24 />
        <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]" data-name="Image+Border">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden rounded-[9999px]">
            <img alt="" className="absolute left-[5%] max-w-none size-[90%] top-[5%]" src={imgImageBorder} />
          </div>
          <div aria-hidden="true" className="absolute border-2 border-[#f1f5f9] border-solid inset-0 rounded-[9999px]" />
        </div>
        <Button />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[32px] relative w-full">
          <Container16 />
          <Margin />
          <VerticalBorder />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] w-[359.44px]">
        <p className="leading-[36px] whitespace-pre-wrap">Edit Visit: Juan Dela Cruz</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#fef9c3] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#854d0e] text-[12px] w-[64.88px]">
        <p className="leading-[16px] whitespace-pre-wrap">In Progress</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Background1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] w-[440.97px]">
        <p className="leading-[24px] whitespace-pre-wrap">Consultation ID: #CN-2023-8492 • Last edited 2 mins ago</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[456.32px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #B91C1C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fef2f2] content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#fecaca] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container33 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#b91c1c] text-[14px] text-center w-[94.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">Delete Record</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Button1 />
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container36 />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[147.41px]">
          <p className="leading-[24px] whitespace-pre-wrap">Patient Information</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Patient Name</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">Juan Dela Cruz</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[11px] relative w-full">
          <Container39 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Label />
      <Input1 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Age</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">34 Years</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[11px] relative w-full">
          <Container41 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Label1 />
      <Input2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Gender</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">Male</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[11px] relative w-full">
          <Container43 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Label2 />
      <Input3 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start justify-center relative size-full">
        <Container38 />
        <Container40 />
        <Container42 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading3 />
        <Container37 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p111d6a00} fill="var(--fill-0, #2A9D8F)" id="Icon" />
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
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[91.58px]">
          <p className="leading-[24px] whitespace-pre-wrap">Visit Details</p>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Date of Visit</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-px items-start leading-[0] not-italic px-px relative self-stretch shrink-0 text-[#0f172a] text-[16px]" data-name="Paragraph">
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 w-[16.61px]">
        <p className="leading-[24px] whitespace-pre-wrap">10</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 w-[5.77px]">
        <p className="leading-[24px] whitespace-pre-wrap">/</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 w-[19.84px]">
        <p className="leading-[24px] whitespace-pre-wrap">24</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 w-[5.77px]">
        <p className="leading-[24px] whitespace-pre-wrap">/</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 w-[39.5px]">
        <p className="leading-[24px] whitespace-pre-wrap">2023</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[24px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Svg() {
  return <div className="h-[15px] shrink-0 w-[16px]" data-name="SVG" />;
}

function ImageFill() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[3px] pt-[2px] px-[2px] relative shrink-0 size-[20px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[20px]" data-name="Button menu">
      <ImageFill />
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container49 />
        <ButtonMenu />
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[11px] relative w-full">
          <Container48 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Label3 />
      <Input4 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Time-in</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative self-stretch shrink-0 text-[#0f172a] text-[16px] w-[78.36px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[24px] justify-center left-px top-[12px] w-[20.02px]">
        <p className="leading-[24px] whitespace-pre-wrap">09</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[24px] justify-center left-[22.02px] top-[12px] w-[4.61px]">
        <p className="leading-[24px] whitespace-pre-wrap">:</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[24px] justify-center left-[27.63px] top-[12px] w-[19.98px]">
        <p className="leading-[24px] whitespace-pre-wrap">30</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[24px] justify-center left-[51.86px] top-[12px] w-[25.5px]">
        <p className="leading-[24px] whitespace-pre-wrap">AM</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[24px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Svg1() {
  return <div className="shrink-0 size-[16.8px]" data-name="SVG" />;
}

function ImageFill1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[3px] relative shrink-0 size-[22.8px]" data-name="image fill">
      <Svg1 />
    </div>
  );
}

function ButtonMenu1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[22.8px]" data-name="Button menu">
      <ImageFill1 />
    </div>
  );
}

function ButtonMenuMargin() {
  return (
    <div className="content-stretch flex flex-col h-[22.8px] items-start pl-[8px] relative shrink-0 w-[30.8px]" data-name="Button menu:margin">
      <ButtonMenu1 />
    </div>
  );
}

function Container51() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container52 />
        <ButtonMenuMargin />
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[11px] relative w-full">
          <Container51 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Label4 />
      <Input5 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex gap-[24px] h-[72px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container50 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Chief Complaint</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">Severe pulsating headache on the left side, sensitive to light.</p>
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[11px] relative w-full">
          <Container54 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Input6 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Assessment / Intervention</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full whitespace-pre-wrap">
          <p className="mb-0">{`Patient advised to rest in a dark room. Avoid caffeine triggers. Return if `}</p>
          <p>symptoms persist for more than 48 hours.</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[59px] pt-[11px] px-[13px] relative w-full">
          <Container56 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Label6 />
      <Textarea />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Remarks</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Additional notes or comments</p>
        </div>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[13px] relative w-full">
          <Container58 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Label7 />
      <Input7 />
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Container46 />
        <Container53 />
        <Container55 />
        <Container57 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading4 />
        <Container45 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[22px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
        <g id="Container">
          <path d={svgPaths.p29265f80} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container59 />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[159.16px]">
          <p className="leading-[24px] whitespace-pre-wrap">Prescribed Medicine</p>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[14px] w-[116.8px]">
        <p className="leading-[20px] whitespace-pre-wrap">Inventory Update</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#1e3a8a] text-[14px] w-[547.59px] whitespace-pre-wrap">
        <p className="mb-0">Note: Inventory will be adjusted automatically based on changes made to medicine</p>
        <p>quantities below.</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[547.59px]" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <div className="relative shrink-0 size-[20px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p6c8ea80} fill="var(--fill-0, #2563EB)" id="Icon" />
          </svg>
        </div>
        <Container60 />
      </div>
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Medicine</p>
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
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[248px] pr-[9px] py-[8.5px] top-0 w-[278px]" data-name="image fill">
      <Svg2 />
    </div>
  );
}

function Container65() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[13px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[166.56px]">
        <p className="leading-[20px] whitespace-pre-wrap">Sumatriptan 50mg Tablet</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill2 />
      <Container65 />
    </div>
  );
}

function Container64() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Label8 />
        <Options />
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Qty</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">6</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container69 />
    </div>
  );
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container67() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container68 />
        <div className="flex flex-row items-center self-stretch">
          <RectangleAlignStretch />
        </div>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container67 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Label9 />
        <Input8 />
      </div>
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Dosage</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">1 tab PRN</p>
        </div>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container71 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Label10 />
        <Input9 />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.pd83d200} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 size-[38px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Container72 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[16px] items-end p-[17px] relative w-full">
          <Container64 />
          <Container66 />
          <Container70 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Medicine</p>
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
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[248px] pr-[9px] py-[8.5px] top-0 w-[278px]" data-name="image fill">
      <Svg3 />
    </div>
  );
}

function Container74() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[13px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[115.33px]">
        <p className="leading-[20px] whitespace-pre-wrap">Ibuprofen 400mg</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-white h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill3 />
      <Container74 />
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Label11 />
        <Options1 />
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Qty</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">10</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container78 />
    </div>
  );
}

function RectangleAlignStretch1() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container77 />
        <div className="flex flex-row items-center self-stretch">
          <RectangleAlignStretch1 />
        </div>
      </div>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container76 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Label12 />
        <Input10 />
      </div>
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Dosage</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">1 tab 3x a day</p>
        </div>
      </div>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container80 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Label13 />
        <Input11 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
        <g id="Container">
          <path d={svgPaths.pd83d200} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 size-[38px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Container81 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[16px] items-end p-[17px] relative w-full">
          <Container73 />
          <Container75 />
          <Container79 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20803d40} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(42,157,143,0.05)] content-stretch flex gap-[8px] items-center justify-center px-px py-[13px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(42,157,143,0.4)] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container82 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[14px] text-center w-[93.23px]">
        <p className="leading-[20px] whitespace-pre-wrap">Add Medicine</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pt-[4px] relative w-full">
        <BackgroundBorder />
        <BackgroundBorder1 />
        <Button4 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading5 />
        <Background2 />
        <Container63 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p3e9df400} fill="var(--fill-0, #2A9D8F)" id="Icon" />
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
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[86.61px]">
          <p className="leading-[24px] whitespace-pre-wrap">Disposition</p>
        </div>
      </div>
    </div>
  );
}

function InputMargin() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Input:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="bg-white relative rounded-[16px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[16px]" />
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[130.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">Back to Class/Work</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-[130.89px]" data-name="Container">
      <Container87 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-full relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start justify-center pl-[12px] relative">
        <Container86 />
      </div>
    </div>
  );
}

function Label14() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] self-stretch shrink-0 w-[196.66px]" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[17px] relative size-full">
        <InputMargin />
        <Margin1 />
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

function Input12() {
  return (
    <div className="absolute bg-[#2a9d8f] content-stretch flex flex-col items-start left-[-1px] p-px rounded-[16px] size-[18px] top-px" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImageFill4 />
    </div>
  );
}

function InputMargin1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Input:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input12 />
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[73.73px]">
        <p className="leading-[20px] whitespace-pre-wrap">Sent Home</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-[73.73px]" data-name="Container">
      <Container89 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-full relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start justify-center pl-[12px] relative">
        <Container88 />
      </div>
    </div>
  );
}

function Label15() {
  return (
    <div className="bg-[rgba(42,157,143,0.05)] relative rounded-[8px] self-stretch shrink-0 w-[196.67px]" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#2a9d8f] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[17px] relative size-full">
        <InputMargin1 />
        <Margin2 />
      </div>
    </div>
  );
}

function InputMargin2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Input:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="bg-white relative rounded-[16px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[16px]" />
        </div>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[133.34px]">
        <p className="leading-[20px] whitespace-pre-wrap">Referred to Hospital</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-[133.34px]" data-name="Container">
      <Container91 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-full relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start justify-center pl-[12px] relative">
        <Container90 />
      </div>
    </div>
  );
}

function Label16() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] self-stretch shrink-0 w-[196.67px]" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[17px] relative size-full">
        <InputMargin2 />
        <Margin3 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex gap-[16px] h-[52px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Label14 />
      <Label15 />
      <Label16 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">Release Details</p>
        </div>
      </div>
    </div>
  );
}

function Label17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Notified Person</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Name of guardian/parent</p>
        </div>
      </div>
    </div>
  );
}

function Input13() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[11px] pt-[10px] px-[13px] relative w-full">
          <Container94 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative self-stretch shrink-0 w-[182.66px]" data-name="Container">
      <Label17 />
      <Input13 />
    </div>
  );
}

function Label18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Relationship</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">e.g. Mother, Father</p>
        </div>
      </div>
    </div>
  );
}

function Input14() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[11px] pt-[10px] px-[13px] relative w-full">
          <Container96 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative self-stretch shrink-0 w-[182.67px]" data-name="Container">
      <Label18 />
      <Input14 />
    </div>
  );
}

function Label19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Time of Release</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative self-stretch shrink-0 text-[#0f172a] text-[14px] w-[50.69px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-px top-[9.5px] w-[12.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">--</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[14.89px] top-[9.5px] w-[4.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">:</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[19.94px] top-[9.5px] w-[12.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">--</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[36.8px] top-[9.5px] w-[12.89px]">
        <p className="leading-[20px] whitespace-pre-wrap">--</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Svg5() {
  return <div className="shrink-0 size-[14.69px]" data-name="SVG" />;
}

function ImageFill5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[3px] relative shrink-0 size-[20.69px]" data-name="image fill">
      <Svg5 />
    </div>
  );
}

function ButtonMenu2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[20.69px]" data-name="Button menu">
      <ImageFill5 />
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

function Container98() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container99 />
        <ButtonMenuMargin1 />
      </div>
    </div>
  );
}

function Input15() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container98 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative self-stretch shrink-0 w-[182.67px]" data-name="Container">
      <Label19 />
      <Input15 />
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[77px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start justify-center relative size-full">
        <Container93 />
        <Container95 />
        <Container97 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[21px] relative w-full">
        <Heading7 />
        <Container92 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative w-full">
        <Container85 />
        <BackgroundBorder2 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading6 />
        <Container84 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[672px]" data-name="Container">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
      <BackgroundBorderShadow3 />
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p30354100} fill="var(--fill-0, #2A9D8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container101 />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[82.14px]">
          <p className="leading-[24px] whitespace-pre-wrap">Vital Signs</p>
        </div>
      </div>
    </div>
  );
}

function Label20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">BP (mmHg)</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">120/80</p>
        </div>
      </div>
    </div>
  );
}

function Input16() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container104 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-0 right-[143px] top-0" data-name="Container">
      <Label20 />
      <Input16 />
    </div>
  );
}

function Label21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">HR (bpm)</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">78</p>
        </div>
      </div>
    </div>
  );
}

function Input17() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container106 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[143px] right-0 top-0" data-name="Container">
      <Label21 />
      <Input17 />
    </div>
  );
}

function Label22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Temp (°C)</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">36.6</p>
        </div>
      </div>
    </div>
  );
}

function Input18() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container108 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-0 right-[143px] top-[78px]" data-name="Container">
      <Label22 />
      <Input18 />
    </div>
  );
}

function Label23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">RR (bpm)</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px] whitespace-pre-wrap">18</p>
        </div>
      </div>
    </div>
  );
}

function Input19() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative w-full">
          <Container110 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[143px] right-0 top-[78px]" data-name="Container">
      <Label23 />
      <Input19 />
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container103 />
        <Container105 />
        <Container107 />
        <Container109 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow4() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading8 />
        <Container102 />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[320px]" data-name="Container">
      <BackgroundBorderShadow4 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[32px] h-[1520px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container100 />
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#2a9d8f] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[25px] py-[11px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d8f] text-[14px] text-center w-[47.58px]">
          <p className="leading-[20px] whitespace-pre-wrap">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#2a9d8f] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] relative">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(42,157,143,0.2),0px_2px_4px_-2px_rgba(42,157,143,0.2)]" data-name="Button:shadow" />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[97.8px]">
          <p className="leading-[20px] whitespace-pre-wrap">Save Changes</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-center justify-end pt-[25px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[1024px] relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container34 />
      <HorizontalBorder />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f6f8f8] flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[39.5px] py-[32px] relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px overflow-clip relative" data-name="Main">
      <Header />
      <Background />
    </div>
  );
}

export default function EditConsultationRecordView() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex items-start relative size-full" data-name="Edit Consultation Record View">
      <Aside />
      <Main />
    </div>
  );
}