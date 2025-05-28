import { FormControl, MenuItem, Select } from "@mui/material";
import { Dispatch, FC, useState } from "react";
import { ActionType } from "@/components/Events/Post";
import { forumsCats } from "../Layout/FeedLayout";

interface Props {
  dispatch: Dispatch<any>;
  board: string;
}

const SelectType: FC<Props> = (props) => {
  const { dispatch, board } = props;
  const [selectedTypeID, setSelectedTypeID] = useState<number>(0);

  const handleSelectType = (event: any) => {
    console.log("event.target.value", event.target.value);
    setSelectedTypeID(event.target.value);

    const selectType = forumsCats?.find(
      (item: any) => item.id === Number(event.target.value)
    )?.board;

    dispatch({
      type: ActionType.SET_BOARD,
      payload: {
        board: selectType,
      },
    });
  };

  return (
    <div className="w-full flex items-center gap-2 lg:my-3">
      <span className="hidden md:inline-block font-bold">發文分類：</span>
      <FormControl sx={{ flex: 1 }}>
        <Select
          required
          value={selectedTypeID}
          onChange={handleSelectType}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            fontSize: "14px",
            "& .MuiSelect-select": {
              padding: "0.875rem",
              "@media (min-width: 640px)": {
                padding: "0.7rem",
              },
            },
          }}
        >
          <MenuItem disabled value={0} sx={{ fontSize: "15px" }}>
            請選擇分類
          </MenuItem>
          {forumsCats.map((item: any) => (
            <MenuItem value={item.id} key={item.id} sx={{ fontSize: "15px" }}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectType;
