// src/components/examples/ButtonExample.tsx
import React from "react";
import { Button } from "@/components/ui/Button";
import { FiArrowRight, FiCheck, FiDownload, FiPlus } from "react-icons/fi";

const ButtonExample = () => {
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-dark-surface rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Button Variants
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Button Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Button States
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Icon Buttons
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<FiPlus />}>Add New</Button>
          <Button rightIcon={<FiArrowRight />}>Continue</Button>
          <Button leftIcon={<FiCheck />} variant="secondary">
            Submit
          </Button>
          <Button leftIcon={<FiDownload />} variant="outline">
            Download
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Full Width Button
        </h2>
        <Button fullWidth>Full Width Button</Button>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Mixed Variants
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" leftIcon={<FiCheck />}>
              Submit Form
            </Button>
            <Button variant="secondary" size="lg" rightIcon={<FiArrowRight />}>
              Next Step
            </Button>
          </div>
          <Button variant="outline" fullWidth loading>
            Processing...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;
