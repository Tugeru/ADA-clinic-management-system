import svgPaths from "./svg-vr1hgeygvc";
import imgUserProfile from "figma:asset/2b77cb9146c1d9b482766706ba8a2a5950aced18.png";

function Container1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p2f7a85c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#2a9d90] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] uppercase w-[156.45px]">
        <p className="leading-[17.5px] whitespace-pre-wrap">ADA CLINIC MANAGER</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-[156.45px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Heading />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pb-px px-[24px] relative size-full">
          <Background />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
        <g id="Container">
          <path d={svgPaths.p2e430500} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
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
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[14.667px] relative shrink-0 w-[20.167px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1667 14.6667">
        <g id="Container">
          <path d={svgPaths.p32ff1a80} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
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
          <Container6 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[18.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
        <g id="Container">
          <path d={svgPaths.p3e59d80} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[36.7px]">
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
    <div className="relative shrink-0 size-[18.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
        <g id="Container">
          <path d={svgPaths.p390b5b00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
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
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
        <g id="Container">
          <path d={svgPaths.p1cd20e00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
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
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
        <g id="Container">
          <path d={svgPaths.p1d427b00} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[14px] w-[51.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">Archive</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="bg-[rgba(42,157,144,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
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
    <div className="h-[18.333px] relative shrink-0 w-[18.425px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.425 18.3333">
        <g id="Container">
          <path d={svgPaths.p70dd600} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
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
          <Container16 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Nav">
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

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Nav />
      </div>
    </div>
  );
}

function Aside() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start pr-px relative shrink-0 w-[256px]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Container3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[68.2px]">
        <p className="leading-[28px] whitespace-pre-wrap">Archive</p>
      </div>
    </div>
  );
}

function Container21() {
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

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[190.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saturday, February 28, 2026</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container19 />
        <div className="bg-[#e2e8f0] h-[24px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container20 />
      </div>
    </div>
  );
}

function Container25() {
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
          <Container25 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bottom-[26.19%] content-stretch flex flex-col items-start left-[12px] top-[26.19%]" data-name="Container">
      <div className="relative shrink-0 size-[15px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <path d={svgPaths.p2dbaedc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start max-w-[576px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Input />
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center px-[32px] relative size-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-right w-[171.23px]">
        <p className="leading-[20px] whitespace-pre-wrap">Clinic In-Charge CSASHS</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right w-[36.14px]">
        <p className="leading-[16px] whitespace-pre-wrap">Admin</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[171.23px]" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="User profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shadow-[0px_0px_0px_2px_white] shrink-0 size-[36px]" data-name="Background+Shadow">
      <UserProfile />
    </div>
  );
}

function Container31() {
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
    <div className="content-stretch flex gap-[8px] items-center p-[4px] relative rounded-[9999px] shrink-0" data-name="Button">
      <BackgroundShadow />
      <Container31 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <Container28 />
        <Button />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <Container18 />
          <Container23 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] w-full">
        <p className="leading-[32px] whitespace-pre-wrap">Archived Visits</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Manage historical visit logs and records that have been removed from the active dashboard.</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container35 />
    </div>
  );
}

function Link7() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#2a9d90] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col h-full items-start pb-[14px] px-[4px] relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[14px] w-[37.73px]">
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
      <div className="content-stretch flex flex-col h-full items-start pb-[14px] px-[4px] relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[54px]">
          <p className="leading-[20px] whitespace-pre-wrap">Patients</p>
        </div>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col h-full items-start pb-[14px] px-[4px] relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[68.98px]">
          <p className="leading-[20px] whitespace-pre-wrap">Medicines</p>
        </div>
      </div>
    </div>
  );
}

function Nav1() {
  return (
    <div className="h-[34px] relative shrink-0 w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start relative size-full">
        <Link7 />
        <Link8 />
        <Link9 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Nav1 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Search Patient</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Search by name or ID...</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[11px] pl-[41px] pr-[13px] pt-[10px] relative w-full">
          <Container39 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bottom-[23.68%] content-stretch flex flex-col items-start left-[12px] top-[23.68%]" data-name="Container">
      <div className="relative shrink-0 size-[15px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <path d={svgPaths.p2dbaedc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container40 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[296px]" data-name="Container">
      <Label />
      <Container38 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Date Range</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[86.13px]">
          <p className="leading-[20px] whitespace-pre-wrap">Last 30 Days</p>
        </div>
      </div>
    </div>
  );
}

function Container43() {
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

function Button1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-[9px] relative w-full">
          <Container42 />
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[218px]" data-name="Container">
      <Label1 />
      <Button1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Patient Type</p>
      </div>
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
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[110px] pr-[9px] py-[8.5px] top-0 w-[140px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container46() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[33px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[60.55px]">
        <p className="leading-[20px] whitespace-pre-wrap">All Types</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <ImageFill />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bottom-[26.32%] content-stretch flex flex-col items-start right-[10px] top-[26.32%]" data-name="Container">
      <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #64748B)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Options />
      <Container47 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="Container">
      <Label2 />
      <Container45 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Disposition</p>
      </div>
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
    <div className="absolute content-stretch flex flex-col h-[38px] items-start justify-center left-0 overflow-clip pl-[188px] pr-[9px] py-[8.5px] top-0 w-[218px]" data-name="image fill">
      <Svg1 />
    </div>
  );
}

function Container50() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip right-[33px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[77.67px]">
        <p className="leading-[20px] whitespace-pre-wrap">All Statuses</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-white h-[38px] relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <ImageFill1 />
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bottom-[26.32%] content-stretch flex flex-col items-start right-[10px] top-[26.32%]" data-name="Container">
      <div className="h-[5.55px] relative shrink-0 w-[9px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5.55">
          <path d={svgPaths.p4ab6c80} fill="var(--fill-0, #64748B)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Options1 />
      <Container51 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[218px]" data-name="Container">
      <Label3 />
      <Container49 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container41 />
      <Container44 />
      <Container48 />
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
        <g id="Container">
          <path d={svgPaths.p33549300} fill="var(--fill-0, #1D4ED8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1d4ed8] text-[12px] w-[108.95px]">
        <p className="leading-[16px] whitespace-pre-wrap">Inventory Integrity:</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <Container52 />
          <Container53 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1d4ed8] text-[12px] w-[574.45px]">
            <p className="leading-[16px] whitespace-pre-wrap">Restoring a visit will not automatically modify stock movement history for previously dispensed items.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[20px] pt-[19px] px-[20px] relative w-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[-1px_0_0_0] rounded-[12px] shadow-[0px_0px_0px_1px_rgba(15,23,42,0.05),0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
        <Container36 />
        <Background2 />
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[134.77px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[64.92px]">
        <p className="leading-[20px] whitespace-pre-wrap">Visit Date</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[191.22px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[90.42px]">
        <p className="leading-[20px] whitespace-pre-wrap">Patient Name</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[132.67px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[33.63px]">
        <p className="leading-[20px] whitespace-pre-wrap">Type</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[200px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[69.06px]">
        <p className="leading-[20px] whitespace-pre-wrap">Complaint</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[145.2px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[75.78px]">
        <p className="leading-[20px] whitespace-pre-wrap">Disposition</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[134.83px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[60.81px] whitespace-pre-wrap">
        <p className="mb-0">Date</p>
        <p>Archived</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[27px] pt-[25.5px] px-[24px] relative shrink-0 w-[224.59px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] text-right w-[51.52px]">
        <p className="leading-[20px] whitespace-pre-wrap">Actions</p>
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
        <Cell6 />
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative shrink-0 w-[134.77px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[86.77px]">
        <p className="leading-[20px] whitespace-pre-wrap">Oct 20, 2023</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-center w-[18.47px]">
        <p className="leading-[16px] whitespace-pre-wrap">EM</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[99.22px]">
        <p className="leading-[20px] whitespace-pre-wrap">Elena Martinez</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[143.22px]" data-name="Data">
      <Background3 />
      <Container55 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[45.17px]">
        <p className="leading-[16px] whitespace-pre-wrap">Existing</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative shrink-0 w-[132.67px]" data-name="Data">
      <Background4 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[200px] overflow-clip pb-[23px] pl-[0.01px] pr-[24px] pt-[22px] relative shrink-0 w-[176.01px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[139.84px]">
        <p className="leading-[20px] whitespace-pre-wrap">Seasonal allergies, …</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#2ecc71] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ecc71] text-[12px] w-[52.45px]">
        <p className="leading-[16px] whitespace-pre-wrap">Returned</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[24px] py-[22.5px] relative shrink-0 w-[121.2px]" data-name="Data">
      <Background5 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative shrink-0 w-[110.83px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[83.98px]">
        <p className="leading-[20px] whitespace-pre-wrap">Oct 21, 2023</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p1ef68040} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container56 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[12px] text-center w-[43.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Restore</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[12px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
        <g id="Container">
          <path d={svgPaths.p16805700} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container57 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] text-center w-[36.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Delete</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center justify-end opacity-0 relative shrink-0 w-[176.59px]" data-name="Data">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Row1() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[24px] items-center justify-center pr-[24px] relative w-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
          <Data5 />
          <Data6 />
        </div>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[134.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[83.78px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 19, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#e0e7ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4f46e5] text-[12px] text-center w-[15.69px]">
        <p className="leading-[16px] whitespace-pre-wrap">HD</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[63.88px]">
        <p className="leading-[20px] whitespace-pre-wrap">Harry Dawnson</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[143.22px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background6 />
        <Container58 />
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[12px] w-[25.89px]">
        <p className="leading-[16px] whitespace-pre-wrap">New</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[132.67px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative w-full">
        <Background7 />
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="max-w-[200px] relative shrink-0 w-[176.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[23px] pl-[0.01px] pr-[24px] pt-[22px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[143.23px]">
          <p className="leading-[20px] whitespace-pre-wrap">Acute abdominal pain</p>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#fff7ed] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#f4a261] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[12px] w-[63.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">Sent Home</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[121.2px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] py-[22.5px] relative w-full">
        <Background8 />
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[110.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[86.83px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 22, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p1ef68040} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container59 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[12px] text-center w-[43.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Restore</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[12px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
        <g id="Container">
          <path d={svgPaths.p16805700} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container60 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] text-center w-[36.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Delete</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="opacity-0 relative shrink-0 w-[176.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center justify-end relative w-full">
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
        <div className="content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data7 />
          <Data8 />
          <Data9 />
          <Data10 />
          <Data11 />
          <Data12 />
          <Data13 />
        </div>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[134.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[83.8px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 18, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f3e8ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9333ea] text-[12px] text-center w-[16.52px]">
        <p className="leading-[16px] whitespace-pre-wrap">RK</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[74.14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Robert Kim</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[143.22px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background9 />
        <Container61 />
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[45.17px]">
        <p className="leading-[16px] whitespace-pre-wrap">Existing</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[132.67px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative w-full">
        <Background10 />
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="max-w-[200px] relative shrink-0 w-[176.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[23px] pl-[0.01px] pr-[24px] pt-[22px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[151.23px]">
          <p className="leading-[20px] whitespace-pre-wrap">Routine checkup, blo…</p>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#2ecc71] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ecc71] text-[12px] w-[52.45px]">
        <p className="leading-[16px] whitespace-pre-wrap">Returned</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[121.2px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] py-[22.5px] relative w-full">
        <Background11 />
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[110.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[83.8px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 18, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p1ef68040} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container62 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[12px] text-center w-[43.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Restore</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[12px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
        <g id="Container">
          <path d={svgPaths.p16805700} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container63 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] text-center w-[36.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Delete</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="opacity-0 relative shrink-0 w-[176.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center justify-end relative w-full">
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
        <div className="content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data14 />
          <Data15 />
          <Data16 />
          <Data17 />
          <Data18 />
          <Data19 />
          <Data20 />
        </div>
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[134.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[83.38px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 15, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#fef9c3] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#a16207] text-[12px] text-center w-[15.98px]">
        <p className="leading-[16px] whitespace-pre-wrap">AJ</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[94.8px]">
        <p className="leading-[20px] whitespace-pre-wrap">Alice F. Johnson</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[143.22px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background12 />
        <Container64 />
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#fff1f2] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e11d48] text-[12px] w-[64.67px]">
        <p className="leading-[16px] whitespace-pre-wrap">Emergency</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[132.67px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative w-full">
        <Background13 />
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="max-w-[200px] relative shrink-0 w-[176.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[23px] pl-[0.01px] pr-[24px] pt-[22px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[99.78px]">
          <p className="leading-[20px] whitespace-pre-wrap">Fractured wrist</p>
        </div>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#64748b] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[67.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">Transferred</p>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="relative shrink-0 w-[121.2px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] py-[22.5px] relative w-full">
        <Background14 />
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="relative shrink-0 w-[110.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[83.66px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 16, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p1ef68040} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container65 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[12px] text-center w-[43.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Restore</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[12px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
        <g id="Container">
          <path d={svgPaths.p16805700} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container66 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] text-center w-[36.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Delete</p>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="opacity-0 relative shrink-0 w-[176.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center justify-end relative w-full">
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
        <div className="content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data21 />
          <Data22 />
          <Data23 />
          <Data24 />
          <Data25 />
          <Data26 />
          <Data27 />
        </div>
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="relative shrink-0 w-[134.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[83.98px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 12, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[12px] text-center w-[20.39px]">
        <p className="leading-[16px] whitespace-pre-wrap">BW</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[88.8px]">
        <p className="leading-[20px] whitespace-pre-wrap">Bruce Wayne</p>
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="relative shrink-0 w-[143.22px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background15 />
        <Container67 />
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[45.17px]">
        <p className="leading-[16px] whitespace-pre-wrap">Existing</p>
      </div>
    </div>
  );
}

function Data30() {
  return (
    <div className="relative shrink-0 w-[132.67px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative w-full">
        <Background16 />
      </div>
    </div>
  );
}

function Data31() {
  return (
    <div className="max-w-[200px] relative shrink-0 w-[176.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[23px] pl-[0.01px] pr-[24px] pt-[22px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[151.18px]">
          <p className="leading-[20px] whitespace-pre-wrap">Shoulder dislocation,…</p>
        </div>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#fff7ed] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#f4a261] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#f4a261] text-[12px] w-[63.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">Sent Home</p>
      </div>
    </div>
  );
}

function Data32() {
  return (
    <div className="relative shrink-0 w-[121.2px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] py-[22.5px] relative w-full">
        <Background17 />
      </div>
    </div>
  );
}

function Data33() {
  return (
    <div className="relative shrink-0 w-[110.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[83.78px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 13, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p1ef68040} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container68 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[12px] text-center w-[43.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Restore</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[12px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
        <g id="Container">
          <path d={svgPaths.p16805700} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container69 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] text-center w-[36.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Delete</p>
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="opacity-0 relative shrink-0 w-[176.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center justify-end relative w-full">
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
        <div className="content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data28 />
          <Data29 />
          <Data30 />
          <Data31 />
          <Data32 />
          <Data33 />
          <Data34 />
        </div>
      </div>
    </div>
  );
}

function Data35() {
  return (
    <div className="relative shrink-0 w-[134.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[83.92px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 10, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#fce7f3] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#db2777] text-[12px] text-center w-[16.88px]">
        <p className="leading-[16px] whitespace-pre-wrap">SG</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[82.94px]">
        <p className="leading-[20px] whitespace-pre-wrap">Sarah Green</p>
      </div>
    </div>
  );
}

function Data36() {
  return (
    <div className="relative shrink-0 w-[143.22px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background18 />
        <Container70 />
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[12px] w-[25.89px]">
        <p className="leading-[16px] whitespace-pre-wrap">New</p>
      </div>
    </div>
  );
}

function Data37() {
  return (
    <div className="relative shrink-0 w-[132.67px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] pt-[22.5px] px-[24px] relative w-full">
        <Background19 />
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="max-w-[200px] relative shrink-0 w-[176.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[22.5px] pl-[0.01px] pr-[24px] pt-[22px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[149.65px]">
          <p className="leading-[20px] whitespace-pre-wrap">Migraine, severe sen…</p>
        </div>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#2ecc71] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2ecc71] text-[12px] w-[52.45px]">
        <p className="leading-[16px] whitespace-pre-wrap">Returned</p>
      </div>
    </div>
  );
}

function Data39() {
  return (
    <div className="relative shrink-0 w-[121.2px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] pr-[24px] pt-[22.5px] relative w-full">
        <Background20 />
      </div>
    </div>
  );
}

function Data40() {
  return (
    <div className="relative shrink-0 w-[110.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pr-[24px] pt-[22px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[83.92px]">
          <p className="leading-[20px] whitespace-pre-wrap">Oct 10, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p1ef68040} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container71 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[12px] text-center w-[43.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Restore</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[12px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 12">
        <g id="Container">
          <path d={svgPaths.p16805700} fill="var(--fill-0, #E63946)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container72 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#e63946] text-[12px] text-center w-[36.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Delete</p>
      </div>
    </div>
  );
}

function Data41() {
  return (
    <div className="opacity-0 relative shrink-0 w-[176.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center justify-end relative w-full">
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[24px] items-center justify-center pr-[24px] pt-px relative w-full">
          <Data35 />
          <Data36 />
          <Data37 />
          <Data38 />
          <Data39 />
          <Data40 />
          <Data41 />
        </div>
      </div>
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
      <Row6 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-[1163.28px]" data-name="Table">
      <Header1 />
      <Body />
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Table />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[183.92px]">
          <p className="whitespace-pre-wrap">
            <span className="leading-[20px]">{`Showing `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#0f172a]">1</span>
            <span className="leading-[20px]">{` to `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#0f172a]">6</span>
            <span className="leading-[20px]">{` of `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#0f172a]">42</span>
            <span className="leading-[20px]">{` results`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] text-center w-[58.08px]">
        <p className="leading-[20px] whitespace-pre-wrap">Previous</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] text-center w-[31.33px]">
        <p className="leading-[20px] whitespace-pre-wrap">Next</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative">
        <Button14 />
        <Button15 />
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
          <Container73 />
          <Container74 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Container54 />
        <BackgroundHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <HorizontalBorder1 />
      <Background1 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px overflow-clip relative" data-name="Main">
      <Header />
      <Container32 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[1024px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Aside />
      <Main />
    </div>
  );
}

export default function ArchivedClinicVisitsMasterList() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex flex-col items-start relative size-full" data-name="Archived Clinic Visits Master List">
      <Container />
    </div>
  );
}