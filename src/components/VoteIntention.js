import { useState, useEffect } from 'react';

function VoteIntention({ onIntentionChange, color }) {
  const [voterIntention, setVoterIntention] = useState('');
  const [intentionScale, setIntentionScale] = useState(5);

  const showSecondDropdown = voterIntention !== 'WontSay' && voterIntention !== 'Undecided';

  const confidenceWords = {
    1: 'very uncertain',
    2: 'mostly uncertain',
    3: 'somewhat uncertain',
    4: 'slightly uncertain',
    5: 'neutral',
    6: 'slightly confident',
    7: 'somewhat confident',
    8: 'mostly confident',
    9: 'very confident',
    10: 'extremely confident',
  };

  useEffect(() => {
    const confidenceWord = confidenceWords[intentionScale];
    const intentionString = voterIntention && confidenceWord
      ? `, who intends to vote ${voterIntention} with confidence: ${confidenceWord}`
      : '';
    onIntentionChange(intentionString);
  }, [voterIntention, intentionScale, onIntentionChange]);

  return (
    <div>
      <style>
        {`
          .intention-slider {
            width: 100%;
            margin: 10px 0;
          }
          .intention-slider::-webkit-slider-thumb {
            background: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -8px;
          }
          .intention-slider::-moz-range-thumb {
            background: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
          }
          .intention-slider::-webkit-slider-runnable-track {
            height: 4px;
            background: #ddd;
            border-radius: 2px;
          }
          .intention-slider::-moz-range-track {
            height: 4px;
            background: #ddd;
            border-radius: 2px;
          }
          .tick-container {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            margin-top: 5px;
          }
          .tick-label {
            font-size: 12px;
            color: #666;
            transform: translateX(-50%);
          }
          .confidence-display {
            text-align: center;
            margin: 10px 0;
            font-weight: bold;
            color: ${color};
          }
        `}
      </style>
      <div className="form-group">
        <label htmlFor="voterIntention">Vote Intention:</label>
        <select
          id="voteIntention"
          value={voterIntention}
          className="intention-dropdown"
          onChange={(e) => {
            setVoterIntention(e.target.value);
            if (e.target.value === 'WontSay' || e.target.value === 'Undecided') {
              setIntentionScale(5);
            }
          }}
        >
          <option value="">Party</option>
          <option value="Labour">Labour</option>
          <option value="Conservative">Conservative</option>
          <option value="Green">Green</option>
          <option value="Reform">Reform</option>
          <option value="Libdem">Libdem</option>
          <option value="Undecided">Undecided</option>
          <option value="WontSay">Won't Say</option>
        </select>

        {showSecondDropdown && (
          <div className="intentionScale">
            <label htmlFor="intentionScale">Confidence:</label>
            <div className="confidence-display">
              {confidenceWords[intentionScale]}
            </div>
            <input
              type="range"
              id="intentionScale"
              className="intention-slider"
              min="1"
              max="10"
              value={intentionScale}
              onChange={(e) => setIntentionScale(parseInt(e.target.value))}
            />
            <div className="tick-container">
              <span className="tick-label">Very Uncertain</span>
              <span className="tick-label">Neutral</span>
              <span className="tick-label">Extremely Confident</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoteIntention;