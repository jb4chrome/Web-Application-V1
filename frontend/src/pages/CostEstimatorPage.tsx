import React, { useState } from "react";
import "../styles/CostEstimator.css";
import estimationService from "../services/estimationService";

const CostEstimatorPage: React.FC = () => {
  const [projectType, setProjectType] = useState<string>("Room Painting");
  const [budgetOption, setBudgetOption] = useState<string>("Standard");
  const [length, setLength] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();
  const [area, setArea] = useState<number | undefined>();
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const budgetMultipliers: Record<string, number> = {
    Budget: 1.0,
    Standard: 1.5,
    Premium: 2.5,
  };

  const baseRates: Record<string, number> = {
    "Room Painting": 8,
    Flooring: 12,
    Tiling: 15,
    Carpentry: 20,
  };

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setEstimatedCost(null);

    let computedArea: number | undefined;
    if (area && area > 0) {
      computedArea = area;
    } else if (length && width && length > 0 && width > 0) {
      computedArea = length * width;
    } else {
      setMessage("Please enter either Length and Width or Total Area.");
      return;
    }

    const baseRate = baseRates[projectType];
    const multiplier = budgetMultipliers[budgetOption];
    const cost = computedArea * baseRate * multiplier;

    setEstimatedCost(cost);

    try {
      setLoading(true);
      await estimationService.saveEstimation({
        total_area: computedArea,
        build_quality: `${projectType} - ${budgetOption}`,
        estimated_cost: cost,
      });
      setMessage("Estimation saved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Failed to save estimation.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="estimator-container">
      <h2>Project Cost Estimator</h2>
      <form onSubmit={handleEstimate} className="estimator-form">
        <div className="form-group">
          <label htmlFor="projectType">Project Type</label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="Room Painting">Room Painting</option>
            <option value="Flooring">Flooring</option>
            <option value="Tiling">Tiling</option>
            <option value="Carpentry">Carpentry</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budgetOption">Budget Option</label>
          <select
            id="budgetOption"
            value={budgetOption}
            onChange={(e) => setBudgetOption(e.target.value)}
          >
            <option value="Budget">Budget</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="length">Length (meters)</label>
          <input
            type="number"
            id="length"
            value={length ?? ""}
            onChange={(e) => setLength(parseFloat(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="width">Width (meters)</label>
          <input
            type="number"
            id="width"
            value={width ?? ""}
            onChange={(e) => setWidth(parseFloat(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>
        <div className="divider">or</div>
        <div className="form-group">
          <label htmlFor="area">Total Area (sq meters)</label>
          <input
            type="number"
            id="area"
            value={area ?? ""}
            onChange={(e) => setArea(parseFloat(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Estimating..." : "Estimate Cost"}
        </button>
      </form>

      {estimatedCost !== null && (
        <div className="result">
          <h3>Estimated Cost: £{estimatedCost.toFixed(2)}</h3>
        </div>
      )}
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default CostEstimatorPage;
