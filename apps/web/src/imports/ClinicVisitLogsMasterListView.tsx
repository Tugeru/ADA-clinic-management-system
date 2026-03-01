import svgPaths from "./svg-8jxh12zgt5";
import imgProfile from "figma:asset/45a2f86803bb011c69b544c4ea3bc9e404bd7b45.png";

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
    <div className="bg-[#2a9d90] relative rounded-[6px] shrink-0 size-[32px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] tracking-[-0.35px] w-[77.41px]">
        <p className="leading-[20px] whitespace-pre-wrap">ADA CLINIC</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] tracking-[0.25px] w-full">
        <p className="leading-[10px] whitespace-pre-wrap">MANAGER</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0 w-full" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-[77.41px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Heading />
        <Margin />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
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
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p498ff00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container4 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[73.02px]">
            <p className="leading-[20px] whitespace-pre-wrap">Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[18.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
        <g id="Container">
          <path d={svgPaths.p3f23d700} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container5 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[54px]">
            <p className="leading-[20px] whitespace-pre-wrap">Patients</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
        <g id="Container">
          <path d={svgPaths.p31ef6980} fill="var(--fill-0, #2A9D90)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[rgba(42,157,144,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container6 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#2a9d90] text-[14px] w-[36.7px]">
            <p className="leading-[20px] whitespace-pre-wrap">Visits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p368b7f00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container7 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[63.22px]">
            <p className="leading-[20px] whitespace-pre-wrap">Inventory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p19986780} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container8 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[62.11px]">
            <p className="leading-[20px] whitespace-pre-wrap">Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p212e1900} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container9 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[51.11px]">
            <p className="leading-[20px] whitespace-pre-wrap">Archive</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[16.75px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.75 16.6667">
        <g id="Container">
          <path d={svgPaths.p18e22d80} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <Container10 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[54.92px]">
            <p className="leading-[20px] whitespace-pre-wrap">Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Nav">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[16px] relative size-full">
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
    <div className="bg-white content-stretch flex flex-col h-full items-start pr-px relative shrink-0 w-[256px]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Nav />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[49.83px]">
        <p className="leading-[28px] whitespace-pre-wrap">Visits</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 15">
        <g id="Container">
          <path d={svgPaths.p3b95cda0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[188.8px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saturday, February 28, 2026</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Heading1 />
        <div className="bg-[#e2e8f0] h-[24px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container12 />
      </div>
    </div>
  );
}

function Container16() {
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
    <div className="bg-[#f8fafc] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[41px] pr-[17px] py-[11.5px] relative size-full">
          <Container16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bottom-1/4 content-stretch flex flex-col items-start left-[12px] top-1/4" data-name="Container">
      <div className="relative shrink-0 size-[15px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <path d={svgPaths.p2dbaedc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container17 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="flex-[1_0_0] max-w-[672px] min-h-px min-w-px relative" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] px-[48px] relative w-full">
        <Container15 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[110.95px]">
        <p className="leading-[20px] whitespace-pre-wrap">Clinic In-Charge</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-center w-[49.06px]">
        <p className="leading-[16px] whitespace-pre-wrap">CSASHS</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <Container19 />
      <Container20 />
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

function Background1() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <Profile />
    </div>
  );
}

function Container21() {
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
    <div className="relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[12px] pr-[8px] py-[6px] relative">
        <Container18 />
        <Background1 />
        <Container21 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <Container11 />
          <Margin1 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
          <p className="leading-[normal] whitespace-pre-wrap">Search by patient name...</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8fafc] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[41px] pr-[17px] py-[11.5px] relative size-full">
          <Container26 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bottom-1/4 content-stretch flex flex-col items-start left-[12px] top-1/4" data-name="Container">
      <div className="relative shrink-0 size-[15px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <path d={svgPaths.p2dbaedc0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] min-w-[240px] relative shrink-0 w-[384px]" data-name="Container">
      <Input1 />
      <Container27 />
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
    <div className="absolute content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip pl-[113px] pr-[9px] py-[9.5px] top-0 w-[143px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container29() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip pr-[56.56px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[40.44px]">
        <p className="leading-[20px] whitespace-pre-wrap">Today</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[143px]" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill />
      <Container29 />
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
    <div className="absolute content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip pl-[77px] pr-[9px] py-[9.5px] top-0 w-[107px]" data-name="image fill">
      <Svg1 />
    </div>
  );
}

function Container30() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[60.55px]">
        <p className="leading-[20px] whitespace-pre-wrap">All Types</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[107px]" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill1 />
      <Container30 />
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
    <div className="absolute content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip pl-[134px] pr-[9px] py-[9.5px] top-0 w-[164px]" data-name="image fill">
      <Svg2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[13px] overflow-clip pr-[16.95px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[101.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">All Dispositions</p>
      </div>
    </div>
  );
}

function Options2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[164px]" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <ImageFill2 />
      <Container31 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Options />
      <Options1 />
      <Options2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Container25 />
        <div className="bg-[#e2e8f0] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container28 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20803d40} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#2a9d90] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative">
        <Container32 />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[64.13px]">
          <p className="leading-[20px] whitespace-pre-wrap">New Visit</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[17px] pr-[16.99px] py-[17px] relative w-full">
          <Container24 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[16px] w-[95.53px]">
          <p className="leading-[24px] whitespace-pre-wrap">Recent Logs</p>
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p38806900} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative">
        <Container33 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center w-[76.75px]">
          <p className="leading-[20px] whitespace-pre-wrap">Export CSV</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[24px] relative w-full">
          <Heading2 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[18px] relative shrink-0 w-[64px]" data-name="Cell">
      <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[135.7px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[31.23px]">
        <p className="leading-[20px] whitespace-pre-wrap">Date</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[105.61px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[49.77px]">
        <p className="leading-[20px] whitespace-pre-wrap">Time In</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[188.59px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[90.42px]">
        <p className="leading-[20px] whitespace-pre-wrap">Patient Name</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[114.72px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[33.63px]">
        <p className="leading-[20px] whitespace-pre-wrap">Type</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[315.5px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[69.06px]">
        <p className="leading-[20px] whitespace-pre-wrap">Complaint</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[177.86px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[75.78px]">
        <p className="leading-[20px] whitespace-pre-wrap">Disposition</p>
      </div>
    </div>
  );
}

function Cell7() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[16px] relative shrink-0 w-[160.02px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] text-right w-[51.52px]">
        <p className="leading-[20px] whitespace-pre-wrap">Actions</p>
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
      <Cell6 />
      <Cell7 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative shrink-0 w-[64px]" data-name="Data">
      <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[25px] pt-[23.5px] px-[24px] relative shrink-0 w-[135.7px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[87.7px]">
        <p className="leading-[20px] whitespace-pre-wrap">Feb 26, 2026</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative shrink-0 w-[105.61px]" data-name="Data">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[57.61px]">
        <p className="leading-[16px] whitespace-pre-wrap">09:15 AM</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[12px] text-center w-[15.69px]">
        <p className="leading-[16px] whitespace-pre-wrap">JD</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center pl-[24px] relative shrink-0 w-[164.59px]" data-name="Data">
      <Background2 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[63.88px]">
        <p className="leading-[20px] whitespace-pre-wrap">John Doe</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[44.83px]">
        <p className="leading-[16px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24.5px] pl-[48.01px] pr-[24px] pt-[24px] relative shrink-0 w-[138.73px]" data-name="Data">
      <Background3 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] overflow-clip pb-[25px] pt-[23.5px] px-[24px] relative shrink-0 w-[315.5px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[261.34px]">
        <p className="leading-[20px] whitespace-pre-wrap">Severe headache and slight dizziness...</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex gap-[5.99px] items-center pl-[10px] pr-[41.21px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#10b981] h-[6px] rounded-[9999px] shrink-0 w-[5.8px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#047857] text-[12px] w-[66.86px] whitespace-pre-wrap">
        <p className="mb-0">Returned to</p>
        <p>Class</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[177.86px]" data-name="Data">
      <Background4 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[11.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 11.25">
        <g id="Container">
          <path d={svgPaths.p110cf380} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container34 />
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.p10054d00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container36 />
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end opacity-0 relative shrink-0 w-[136.01px]" data-name="Data">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Row1() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[24px] relative w-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
          <Data5 />
          <Data6 />
          <Data7 />
        </div>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[26.5px] relative w-full">
        <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[135.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[87.7px]">
          <p className="leading-[20px] whitespace-pre-wrap">Feb 26, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[105.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[26.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[57.61px]">
          <p className="leading-[16px] whitespace-pre-wrap">08:45 AM</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f3e8ff] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9333ea] text-[12px] text-center w-[19.05px]">
        <p className="leading-[16px] whitespace-pre-wrap">MS</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[164.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[24px] relative w-full">
        <Background5 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[87.52px]">
          <p className="leading-[20px] whitespace-pre-wrap">Maria Santos</p>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#faf5ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#7e22ce] text-[12px] w-[46.72px]">
        <p className="leading-[16px] whitespace-pre-wrap">Teacher</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[138.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48.01px] pr-[24px] py-[24.5px] relative w-full">
        <Background6 />
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="max-w-[320px] relative shrink-0 w-[315.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[25px] pt-[24px] px-[24px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[231.52px]">
          <p className="leading-[20px] whitespace-pre-wrap">Blood pressure checkup requested</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex gap-[5.99px] items-center pl-[10px] pr-[41.15px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#10b981] h-[6px] rounded-[9999px] shrink-0 w-[5.86px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#047857] text-[12px] w-[66.86px] whitespace-pre-wrap">
        <p className="mb-0">Returned to</p>
        <p>Work</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[177.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16.5px] relative w-full">
        <Background7 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[11.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 11.25">
        <g id="Container">
          <path d={svgPaths.p110cf380} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container37 />
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.p10054d00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container39 />
    </div>
  );
}

function Data15() {
  return (
    <div className="opacity-0 relative shrink-0 w-[136.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative w-full">
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[24px] pt-px relative w-full">
          <Data8 />
          <Data9 />
          <Data10 />
          <Data11 />
          <Data12 />
          <Data13 />
          <Data14 />
          <Data15 />
        </div>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[24.5px] relative w-full">
        <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[135.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[87.7px]">
          <p className="leading-[20px] whitespace-pre-wrap">Feb 26, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[105.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[24.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[57.61px]">
          <p className="leading-[16px] whitespace-pre-wrap">08:30 AM</p>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[12px] text-center w-[15.77px]">
        <p className="leading-[16px] whitespace-pre-wrap">RR</p>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[164.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[24px] relative w-full">
        <Background8 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[73.27px]">
          <p className="leading-[20px] whitespace-pre-wrap">Rico Reyes</p>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[44.83px]">
        <p className="leading-[16px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[138.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48.01px] pr-[24px] py-[22.5px] relative w-full">
        <Background9 />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="max-w-[320px] relative shrink-0 w-[315.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[23px] pt-[22px] px-[24px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[194.42px]">
          <p className="leading-[20px] whitespace-pre-wrap">High fever (39.5°C) and chills</p>
        </div>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex gap-[6px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#f97316] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2410c] text-[12px] w-[63.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">Sent Home</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[177.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative w-full">
        <Background10 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[11.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 11.25">
        <g id="Container">
          <path d={svgPaths.p110cf380} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.p10054d00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container42 />
    </div>
  );
}

function Data23() {
  return (
    <div className="opacity-0 relative shrink-0 w-[136.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative w-full">
        <Button9 />
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[24px] pt-px relative w-full">
          <Data16 />
          <Data17 />
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
    <div className="relative shrink-0 w-[64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[26.5px] relative w-full">
        <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="relative shrink-0 w-[135.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[87.42px]">
          <p className="leading-[20px] whitespace-pre-wrap">Feb 25, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="relative shrink-0 w-[105.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[26.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[57.61px]">
          <p className="leading-[16px] whitespace-pre-wrap">03:20 PM</p>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#ccfbf1] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d9488] text-[12px] text-center w-[15.75px]">
        <p className="leading-[16px] whitespace-pre-wrap">AL</p>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="relative shrink-0 w-[164.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[24px] relative w-full">
        <Background11 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[62.34px]">
          <p className="leading-[20px] whitespace-pre-wrap">Anna Lim</p>
        </div>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[44.83px]">
        <p className="leading-[16px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="relative shrink-0 w-[138.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48.01px] pr-[24px] py-[24.5px] relative w-full">
        <Background12 />
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="max-w-[320px] relative shrink-0 w-[315.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[25px] pt-[24px] px-[24px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[180.53px]">
          <p className="leading-[20px] whitespace-pre-wrap">Minor abrasion on left knee</p>
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex gap-[5.99px] items-center pl-[10px] pr-[41.21px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#10b981] h-[6px] rounded-[9999px] shrink-0 w-[5.8px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#047857] text-[12px] w-[66.86px] whitespace-pre-wrap">
        <p className="mb-0">Returned to</p>
        <p>Class</p>
      </div>
    </div>
  );
}

function Data30() {
  return (
    <div className="relative shrink-0 w-[177.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16.5px] relative w-full">
        <Background13 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[11.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 11.25">
        <g id="Container">
          <path d={svgPaths.p110cf380} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.p10054d00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container45 />
    </div>
  );
}

function Data31() {
  return (
    <div className="opacity-0 relative shrink-0 w-[136.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative w-full">
        <Button12 />
        <Button13 />
        <Button14 />
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[24px] pt-px relative w-full">
          <Data24 />
          <Data25 />
          <Data26 />
          <Data27 />
          <Data28 />
          <Data29 />
          <Data30 />
          <Data31 />
        </div>
      </div>
    </div>
  );
}

function Data32() {
  return (
    <div className="relative shrink-0 w-[64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[28.5px] relative w-full">
        <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}

function Data33() {
  return (
    <div className="relative shrink-0 w-[135.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[87.42px]">
          <p className="leading-[20px] whitespace-pre-wrap">Feb 25, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="relative shrink-0 w-[105.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[28.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[57.61px]">
          <p className="leading-[16px] whitespace-pre-wrap">01:15 PM</p>
        </div>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex h-[32px] items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 w-[31.22px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[12px] text-center w-[16.66px]">
        <p className="leading-[16px] whitespace-pre-wrap">GT</p>
      </div>
    </div>
  );
}

function Data35() {
  return (
    <div className="relative shrink-0 w-[164.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[24px] relative w-full">
        <Background14 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[55.44px] whitespace-pre-wrap">
          <p className="mb-0">Guard</p>
          <p>Teodoro</p>
        </div>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#fefce8] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#a16207] text-[12px] w-[24.61px]">
        <p className="leading-[16px] whitespace-pre-wrap">NTP</p>
      </div>
    </div>
  );
}

function Data36() {
  return (
    <div className="relative shrink-0 w-[138.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48.01px] pr-[24px] py-[26.5px] relative w-full">
        <Background15 />
      </div>
    </div>
  );
}

function Data37() {
  return (
    <div className="max-w-[320px] relative shrink-0 w-[315.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[27px] pt-[26px] px-[24px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[253.27px]">
          <p className="leading-[20px] whitespace-pre-wrap">Requesting paracetamol for toothache</p>
        </div>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex gap-[5.99px] items-center pl-[10px] pr-[41.15px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#10b981] h-[6px] rounded-[9999px] shrink-0 w-[5.86px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#047857] text-[12px] w-[66.86px] whitespace-pre-wrap">
        <p className="mb-0">Returned to</p>
        <p>Work</p>
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="relative shrink-0 w-[177.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[18.5px] relative w-full">
        <Background16 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[11.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 11.25">
        <g id="Container">
          <path d={svgPaths.p110cf380} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.p10054d00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container48 />
    </div>
  );
}

function Data39() {
  return (
    <div className="opacity-0 relative shrink-0 w-[136.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative w-full">
        <Button15 />
        <Button16 />
        <Button17 />
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[24px] pt-px relative w-full">
          <Data32 />
          <Data33 />
          <Data34 />
          <Data35 />
          <Data36 />
          <Data37 />
          <Data38 />
          <Data39 />
        </div>
      </div>
    </div>
  );
}

function Data40() {
  return (
    <div className="relative shrink-0 w-[64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] pt-[24.5px] px-[24px] relative w-full">
        <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
          <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}

function Data41() {
  return (
    <div className="relative shrink-0 w-[135.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pt-[22px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[87.42px]">
          <p className="leading-[20px] whitespace-pre-wrap">Feb 25, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data42() {
  return (
    <div className="relative shrink-0 w-[105.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] pt-[24.5px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[57.61px]">
          <p className="leading-[16px] whitespace-pre-wrap">11:00 AM</p>
        </div>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#fee2e2] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#dc2626] text-[12px] text-center w-[15.89px]">
        <p className="leading-[16px] whitespace-pre-wrap">CJ</p>
      </div>
    </div>
  );
}

function Data43() {
  return (
    <div className="relative shrink-0 w-[164.59px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[24px] relative w-full">
        <Background17 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[88.89px]">
          <p className="leading-[20px] whitespace-pre-wrap">Carl Johnson</p>
        </div>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[44.83px]">
        <p className="leading-[16px] whitespace-pre-wrap">Student</p>
      </div>
    </div>
  );
}

function Data44() {
  return (
    <div className="relative shrink-0 w-[138.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] pl-[48.01px] pr-[24px] pt-[22.5px] relative w-full">
        <Background18 />
      </div>
    </div>
  );
}

function Data45() {
  return (
    <div className="max-w-[320px] relative shrink-0 w-[315.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] overflow-clip pb-[22.5px] pt-[22px] px-[24px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[239.94px]">
          <p className="leading-[20px] whitespace-pre-wrap">Allergic reaction, difficulty breathing</p>
        </div>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#fee2e2] content-stretch flex gap-[6px] items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-[#ef4444] rounded-[9999px] shrink-0 size-[6px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#b91c1c] text-[12px] w-[90.8px]">
        <p className="leading-[16px] whitespace-pre-wrap">Sent to Hospital</p>
      </div>
    </div>
  );
}

function Data46() {
  return (
    <div className="relative shrink-0 w-[177.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] pt-[22.5px] px-[24px] relative w-full">
        <Background19 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[11.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 11.25">
        <g id="Container">
          <path d={svgPaths.p110cf380} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container49 />
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.p10054d00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container51 />
    </div>
  );
}

function Data47() {
  return (
    <div className="opacity-0 relative shrink-0 w-[136.01px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative w-full">
        <Button18 />
        <Button19 />
        <Button20 />
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[24px] pt-px relative w-full">
          <Data40 />
          <Data41 />
          <Data42 />
          <Data43 />
          <Data44 />
          <Data45 />
          <Data46 />
          <Data47 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="Body">
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
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Header1 />
        <Body />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[183.92px]">
          <p className="whitespace-pre-wrap">
            <span className="leading-[20px]">{`Showing `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic">1</span>
            <span className="leading-[20px]">{` to `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic">6</span>
            <span className="leading-[20px]">{` of `}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic">42</span>
            <span className="leading-[20px]">{` results`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center opacity-50 px-[13px] py-[5px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] text-center w-[58.08px]">
        <p className="leading-[20px] whitespace-pre-wrap">Previous</p>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] text-center w-[31.33px]">
        <p className="leading-[20px] whitespace-pre-wrap">Next</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative">
        <Button21 />
        <Button22 />
      </div>
    </div>
  );
}

function OverlayHorizontalBorder() {
  return (
    <div className="bg-[rgba(248,250,252,0.5)] relative shrink-0 w-full" data-name="Overlay+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] pt-[17px] px-[24px] relative w-full">
          <Container52 />
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <HorizontalBorder1 />
        <Table />
        <OverlayHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1400px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex flex-[1_0_0] flex-col h-full isolate items-start min-h-px min-w-px overflow-clip relative" data-name="Main">
      <Header />
      <Container22 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[991px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Aside />
      <Main />
    </div>
  );
}

export default function ClinicVisitLogsMasterListView() {
  return (
    <div className="bg-[#f6f8f8] content-stretch flex flex-col items-start relative size-full" data-name="Clinic Visit Logs Master List View">
      <Container />
    </div>
  );
}