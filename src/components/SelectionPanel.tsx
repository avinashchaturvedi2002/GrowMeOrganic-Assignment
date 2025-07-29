import React from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import type { InputNumberValueChangeEvent } from 'primereact/inputnumber';

type SelectionPanelProps = {
  
  opRef: React.RefObject<OverlayPanel | null>; 
  numToSelect: number;
  setNumToSelect: (value: number) => void;
  totalRecords: number;
  onSubmit: () => void;
};

const SelectionPanel: React.FC<SelectionPanelProps> = ({
  opRef,
  numToSelect,
  setNumToSelect,
  totalRecords,
  onSubmit,
}) => {
  return (
    <OverlayPanel ref={opRef} showCloseIcon id="overlay_panel" className="p-4 rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Select N Rows</h3>
        <InputNumber
          value={numToSelect}
          onValueChange={(e: InputNumberValueChangeEvent) => setNumToSelect(e.value ?? 0)}
          min={0}
          max={totalRecords}
          showButtons
          buttonLayout="horizontal"
          decrementButtonClassName="p-button-secondary"
          incrementButtonClassName="p-button-secondary"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          className="w-full"
          placeholder="Number of rows"
          
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          onClick={onSubmit}
          className="p-button-primary w-full"
        />
      </div>
    </OverlayPanel>
  );
};

export default SelectionPanel;