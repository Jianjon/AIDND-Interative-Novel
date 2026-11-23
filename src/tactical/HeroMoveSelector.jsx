export function HeroMoveSelector({
  hero,
  moveOptions = [],
  currentMove = null,
  customMoveCell = null,
  activePlan = null,
  onSelectMove,
  onClearCustomCell,
}) {
  if (!hero) return null;

  const badgeText = (() => {
    if (customMoveCell) {
      const steps = activePlan?.stepsUsed ?? 0;
      return `指定格 (${customMoveCell.cx + 1},${customMoveCell.cy + 1}) · ${steps}/${activePlan?.maxSteps || 6} 格`;
    }
    if (activePlan && currentMove && currentMove !== "hold") {
      const perks = [];
      perks.push(`${activePlan.stepsUsed}/${activePlan.maxSteps} 格`);
      if (activePlan.flanking) perks.push("夾擊+2");
      if (activePlan.stealthReady) perks.push("潛行優勢");
      if (activePlan.stance?.cover) perks.push("半掩護AC+2");
      if (activePlan.guardingAllyName) perks.push(`護衛${activePlan.guardingAllyName}`);
      return perks.join(" · ");
    }
    return "自動配合動作或點格指定";
  })();

  return (
    <div className="tactical-move-box" onClick={(e) => e.stopPropagation()}>
      <div className="tactical-step-header">
        <span className="tactical-step-label">① 移動走位（先走位）</span>
        <span className="tactical-move-badge">{badgeText}</span>
        {customMoveCell && onClearCustomCell && (
          <button
            type="button"
            className="tactical-clear-pin"
            title="取消手動格點，改回戰術自動走位"
            onClick={() => onClearCustomCell()}
          >
            清除指定 ×
          </button>
        )}
      </div>

      <div className="tactical-move-grid">
        {moveOptions.map((opt) => {
          const isOn = !customMoveCell && currentMove === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className="tactical-move-btn"
              data-on={isOn ? "true" : "false"}
              title={opt.desc}
              onClick={() => onSelectMove && onSelectMove(isOn ? null : opt.id)}
            >
              <span className="tac-btn-icon" aria-hidden="true">
                {opt.icon}
              </span>
              <span className="tac-btn-text">{opt.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {activePlan?.summaryText && (currentMove || customMoveCell) && (
        <p className="tactical-move-hint">
          {activePlan.summaryText} · 可直接點擊地圖亮格微調落點
        </p>
      )}
      {(!currentMove && !customMoveCell) && (
        <p className="tactical-move-hint is-muted">
          可先點上方走位或地圖亮格；未選時會依下方行動自動配位
        </p>
      )}

      <div className="tactical-step-divider">
        <span>② 執行動作（攻擊／技能／物品）</span>
      </div>
    </div>
  );
}
