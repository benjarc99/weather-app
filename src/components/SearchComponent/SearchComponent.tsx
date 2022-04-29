import { Autocomplete, Button, TextField } from "@mui/material";
import React from "react";
import citiesStates from '../../data/us-citiesWstates';
import { IForm, ICityState } from "../../models/IForm";

interface IProps {
    form: IForm;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCityChange: (object: ICityState) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}



const SearchComponent = ({form, handleChange, handleCityChange, handleSubmit, ...props}: IProps) => {


    return (
        <div >
            <form className="grid  grid-cols-2  md:grid-cols-5 gap-4 m-5 p-5 rounded shadow bg-white" onSubmit={handleSubmit}>
                <TextField
                    error={false}
                    className="col-span-2 w-full mr-3 flex-1" 
                    label="Street Address" 
                    variant="outlined" 
                    required
                    name="streetAddress"
                    value={form.streetAddress}
                    onChange={handleChange}
                    inputProps={{
                        autoFocus: true
                    }}
                />
                <Autocomplete
                    disablePortal
                    selectOnFocus
                    autoHighlight
                    style={{marginRight: '0.8em'}}
                    options={citiesStates}
                    sx={{ width: "100%" }}
                    value={form.selectedCityState || ''}
                    onChange={(e: any, value: any | null) => handleCityChange(value)}
                    getOptionLabel={(option: ICityState) => (option ? option.city + ' - ' + option.state : '')}
                    renderInput={(params) => 
                        <TextField
                            className="col-auto	" 
                            label="City / State" 
                            {...params}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />}
                />
                <TextField 
                    className="col-auto	" 
                    label="Postal Code"
                    name="postalCode" 
                    variant="outlined"
                    value={form.postalCode}
                    onChange={handleChange}
                    inputProps={{
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
                <Button type="submit" className="col-span-full md:col-span-1 me-3" variant="contained">Search</Button>
            </form>
        </div>
    );
};

export default SearchComponent;