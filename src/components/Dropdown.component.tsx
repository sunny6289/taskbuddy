import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DropdownProps } from "../constants/PropData/propData";

const Dropdown = ({
  label,
  options,
  value,
  handleChange,
  defaultValue,
  style,
}: DropdownProps) => {
  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    handleChange(selectedValue);
  };

  return (
    <FormControl size="small" >
      <InputLabel id="dropdown-label">{label}</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={value}
        label={label}
        defaultValue={defaultValue}
        sx={style}
        onChange={handleDropdownChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option.toLowerCase()}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;

// import React, { useState, useRef, useEffect } from "react";

// export function Dropdown({
//   label,
//   items,
//   onChange,
//   onClick,
//   className,
// }: {
//   label: React.ReactNode;
//   items?: any;
//   onChange: (value: any) => void;
//   onClick?: () => void;
//   className?: string;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [data, setData] = useState<string>("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen((prev) => !prev);

//   const closeDropdown = (e: MouseEvent) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(e.target as Node)
//     ) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", closeDropdown);
//     return () => {
//       document.removeEventListener("mousedown", closeDropdown);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Dropdown Trigger Button */}
//       <button
//         onClick={() => {
//           if (onClick) onClick();
//           else toggleDropdown();
//         }}
//         className={`px-2 py-2 flex items-center justify-center rounded-full border border-gray-300 shadow-sm ${className}`}
//       >
//         {/* Custom icon or content */}
//         {data ? data : label}
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute mt-2 left-14 top-3 w-36 bg-[rgba(255,249,249,1)] border-2 border-[rgba(123,25,132,0.15)] rounded-lg shadow-lg z-50">
//           <ul className="py-2">
//             {items?.map((option: any, index: number) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   onChange(option.value);
//                   setData(option.label);
//                 }}
//               >
//                 {option.label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { DropdownProps } from '../PropData/propData';

// const Dropdown = ({label, options, value,taskData, handleChange, defaultValue, style}: DropdownProps) => {

//   return (
//     <FormControl size="small">
//       <InputLabel id="demo-select-small-label">{label}</InputLabel>
//       <Select
//         labelId="demo-select-small-label"
//         id="demo-select-small"
//         value={value}
//         label={label}
//         defaultValue={defaultValue}
//         sx={style}
//         onChange={handleChange}
//       >
//         {
//             options.map((option, idx)=> <MenuItem key={idx} value={option.toLowerCase()}>{option}</MenuItem>)
//         }

//       </Select>
//     </FormControl>
//   );
// }

// export default Dropdown;
