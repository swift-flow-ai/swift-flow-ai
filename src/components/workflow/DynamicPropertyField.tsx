import { useState, useEffect, useCallback } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Input } from "../common";
import {
  integrationSystemService,
  PropertyDefinition,
} from "../../services/integration-system.service";

interface DynamicPropertyFieldProps {
  property: PropertyDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
  integrationId: string;
  installedAppId: string;
  allValues: Record<string, unknown>;
}

export function DynamicPropertyField({
  property,
  value,
  onChange,
  integrationId,
  installedAppId,
  allValues,
}: DynamicPropertyFieldProps) {
  const [options, setOptions] = useState<Array<{ label: string; value: string | number }>>(
    []
  );
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [showField, setShowField] = useState(true);

  // Check showIf condition
  useEffect(() => {
    if (property.showIf) {
      const conditionField = property.showIf.field;
      const conditionValue = property.showIf.value;
      const actualValue = allValues[conditionField];

      // Handle both array and single value conditions
      const conditionValues = Array.isArray(conditionValue)
        ? conditionValue
        : [conditionValue];
      const matchFound = conditionValues.some((cv) => cv === actualValue);

      setShowField(matchFound);
    }
  }, [property.showIf, allValues]);

  const loadDynamicOptions = useCallback(async () => {
    if (!property.dynamicOptions) return;

    try {
      setLoadingOptions(true);
      const dependentValues = property.dynamicOptions.dependsOn?.reduce(
        (acc, dep) => {
          acc[dep] = allValues[dep];
          return acc;
        },
        {} as Record<string, unknown>
      );

      const response = await integrationSystemService.getDynamicOptions(
        integrationId,
        property.key,
        {
          installedAppId,
          propertyKey: property.key,
          dependentValues,
        }
      );

      setOptions(response.options);
    } catch (error) {
      console.error("Failed to load dynamic options:", error);
    } finally {
      setLoadingOptions(false);
    }
  }, [property, integrationId, installedAppId, allValues]);

  // Load dynamic options
  useEffect(() => {
    if (property.dynamicOptions && installedAppId && showField) {
      loadDynamicOptions();
    }
  }, [property.dynamicOptions, installedAppId, showField, loadDynamicOptions]);

  if (!showField) return null;

  // Safe value coercions
  const stringValue =
    typeof value === "string" ? value : value?.toString() || "";
  const numberValue =
    typeof value === "number" ? value : value ? Number(value) : undefined;
  const boolValue = typeof value === "boolean" ? value : false;

  const renderField = () => {
    switch (property.type) {
      case "string":
        return (
          <Input
            type="text"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={property.placeholder}
            required={property.required}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={numberValue || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={property.placeholder}
            required={property.required}
          />
        );

      case "password":
        return (
          <Input
            type="password"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={property.placeholder}
            required={property.required}
          />
        );

      case "boolean":
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={boolValue}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm">{property.label}</span>
          </label>
        );

      case "dropdown": {
        if (loadingOptions) {
          return (
            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Loading options...
              </span>
            </div>
          );
        }

        const dropdownOptions =
          options.length > 0 ? options : property.options || [];

        return (
          <select
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            required={property.required}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">
              {property.placeholder || "Select an option..."}
            </option>
            {dropdownOptions.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      }

      case "multi-select": {
        if (loadingOptions) {
          return (
            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Loading options...
              </span>
            </div>
          );
        }

        const multiOptions =
          options.length > 0 ? options : property.options || [];
        const selectedValues = Array.isArray(value) ? value : [];

        return (
          <div className="space-y-2">
            {multiOptions.map((opt) => (
              <label
                key={String(opt.value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(opt.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedValues, opt.value]);
                    } else {
                      onChange(
                        selectedValues.filter((v) => v !== opt.value)
                      );
                    }
                  }}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        );
      }

      case "date":
        return (
          <Input
            type="date"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            required={property.required}
          />
        );

      case "datetime":
        return (
          <Input
            type="datetime-local"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            required={property.required}
          />
        );

      case "text":
        if (property.multiline) {
          return (
            <textarea
              value={stringValue}
              onChange={(e) => onChange(e.target.value)}
              placeholder={property.placeholder}
              required={property.required}
              rows={property.rows || 4}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
            />
          );
        }
        return (
          <Input
            type="text"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={property.placeholder}
            required={property.required}
          />
        );

      case "json":
      case "code":
        return (
          <textarea
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={property.placeholder || "{}"}
            required={property.required}
            rows={6}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-vertical"
          />
        );

      default:
        return (
          <Input
            type="text"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={property.placeholder}
            required={property.required}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      {property.type !== "boolean" && (
        <label className="block text-sm font-medium">
          {property.label}
          {property.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      {renderField()}

      {property.description && (
        <p className="text-xs text-muted-foreground">
          {property.description}
        </p>
      )}

      {property.required && !value && (
        <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
          <AlertCircle className="h-3 w-3" />
          <span>This field is required</span>
        </div>
      )}
    </div>
  );
}

