export function TacticalGridOverlay({
  isCombat = false,
  grid = null,
  hasPaintedGrid = false,
  phaseMode = "idle", // "picking" | "moving" | "acting" | "idle"
  focusedHeroId = null,
  reachableMap = null,
  previewPaths = [],
  activePlaybackMove = null,
  pinnedCell = null,
  onPickCell = null,
}) {
  if (!grid) return null;

  const { cols, rows, cw, ch, x0, y0, cells } = grid;
  const vLines = [];
  for (let c = 0; c <= cols; c++) {
    const x = x0 + c * cw;
    if (x >= 0 && x <= 100) vLines.push(x);
  }
  const hLines = [];
  for (let r = 0; r <= rows; r++) {
    const y = y0 + r * ch;
    if (y >= 0 && y <= 100) hLines.push(y);
  }

  const specialTerrainCells = isCombat
    ? cells.filter(
        (c) =>
          !c.wall &&
          (c.impassable || c.difficult || c.hazard || c.concealment),
      )
    : [];

  const cellRect = (cx, cy) => ({
    x: x0 + cx * cw,
    y: y0 + cy * ch,
    w: cw,
    h: ch,
  });

  const reachableNodes =
    phaseMode === "picking" && focusedHeroId && reachableMap
      ? [...reachableMap.values()].filter((n) => n.canStop)
      : [];

  return (
    <svg
      className={`tactical-grid-overlay${hasPaintedGrid ? " has-painted-grid" : ""}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="tac-impassable-hatch"
          width="1.6"
          height="1.6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="1.6" stroke="rgba(248, 113, 113, 0.35)" strokeWidth="0.45" />
        </pattern>
      </defs>

      {/* Subtle tactical grid lines */}
      <g className="tac-grid-lines">
        {vLines.map((x, idx) => (
          <line key={`v${idx}`} x1={x} y1={0} x2={x} y2={100} />
        ))}
        {hLines.map((y, idx) => (
          <line key={`h${idx}`} x1={0} y1={y} x2={100} y2={y} />
        ))}
      </g>

      {/* Terrain & obstacle cell highlights */}
      <g className="tac-terrain-layer">
        {specialTerrainCells.map((cell) => {
          const r = cellRect(cell.cx, cell.cy);
          const cls = cell.impassable
            ? "tac-cell is-impassable"
            : cell.hazard
              ? "tac-cell is-hazard"
              : cell.difficult
                ? "tac-cell is-difficult"
                : "tac-cell is-concealment";
          return (
            <rect
              key={`t_${cell.key}`}
              className={cls}
              x={r.x + 0.08}
              y={r.y + 0.08}
              width={Math.max(0.2, r.w - 0.16)}
              height={Math.max(0.2, r.h - 0.16)}
              rx="0.35"
              fill={cell.impassable ? "url(#tac-impassable-hatch)" : undefined}
            >
              {cell.propLabels.length > 0 && (
                <title>{`${cell.propLabels.join("、")}${cell.impassable ? "（不可通行・可提供掩護）" : cell.hazard ? "（危險地形）" : cell.difficult ? "（困難地形：移動消耗 2 倍）" : "（隱蔽迷霧）"}`}</title>
              )}
            </rect>
          );
        })}
      </g>

      {/* Interactive reachable cells for the focused hero */}
      {reachableNodes.length > 0 && (
        <g className="tac-reachable-layer">
          {reachableNodes.map((node) => {
            const gCell = grid.getCell(node.cx, node.cy);
            const r = cellRect(node.cx, node.cy);
            const isPinned =
              pinnedCell && pinnedCell.cx === node.cx && pinnedCell.cy === node.cy;
            const cls = [
              "tac-cell is-reachable",
              gCell?.difficult ? "is-difficult" : "",
              gCell?.hazard ? "is-hazard" : "",
              gCell?.adjacentCover ? "is-cover" : "",
              isPinned ? "is-pinned" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const tipParts = [`點擊指定落點：移動 ${node.cost} 格`];
            if (gCell?.adjacentCover) tipParts.push("半掩護 AC+2");
            if (gCell?.concealment) tipParts.push("迷霧隱蔽");
            if (gCell?.difficult) tipParts.push("困難地形");
            if (gCell?.hazard) tipParts.push("危險區域");
            return (
              <rect
                key={`r_${node.key}`}
                className={cls}
                x={r.x + 0.12}
                y={r.y + 0.12}
                width={Math.max(0.2, r.w - 0.24)}
                height={Math.max(0.2, r.h - 0.24)}
                rx="0.38"
                onPointerDown={(ev) => {
                  if (ev.button === 0) ev.stopPropagation();
                }}
                onClick={(ev) => {
                  ev.stopPropagation();
                  onPickCell && onPickCell(focusedHeroId, { cx: node.cx, cy: node.cy });
                }}
              >
                <title>{tipParts.join(" · ")}</title>
              </rect>
            );
          })}
        </g>
      )}

      {/* Planned hero paths during picking */}
      {phaseMode === "picking" &&
        previewPaths.map(({ heroId, plan, isFocused }) => {
          if (!plan || !plan.pathPcts || plan.pathPcts.length === 0) return null;
          const dest = plan.pathPcts[plan.pathPcts.length - 1];
          const points = plan.pathPcts.map((p) => `${p[0]},${p[1]}`).join(" ");
          const destRect = cellRect(plan.toCell.cx, plan.toCell.cy);
          return (
            <g
              key={`p_${heroId}`}
              className={`tac-preview-group${isFocused ? " is-focused" : ""}`}
            >
              {plan.pathPcts.length > 1 && (
                <polyline className="tac-path-line" points={points} />
              )}
              {plan.pathPcts.slice(1, -1).map((pt, i) => (
                <circle
                  key={`dot_${i}`}
                  className="tac-step-dot"
                  cx={pt[0]}
                  cy={pt[1]}
                  r="0.45"
                />
              ))}
              <rect
                className="tac-dest-cell"
                x={destRect.x + 0.15}
                y={destRect.y + 0.15}
                width={Math.max(0.2, destRect.w - 0.3)}
                height={Math.max(0.2, destRect.h - 0.3)}
                rx="0.45"
              />
              <circle
                className="tac-dest-ring"
                cx={dest[0]}
                cy={dest[1]}
                r={Math.max(1.2, Math.min(cw, ch) * 0.34)}
              />
            </g>
          );
        })}

      {/* Active playback path during moving / acting */}
      {activePlaybackMove &&
        activePlaybackMove.pathPcts &&
        activePlaybackMove.pathPcts.length > 1 && (
          <g className="tac-playback-trail">
            <polyline
              className={
                activePlaybackMove.side === "foe"
                  ? "tac-path-line tac-path-foe"
                  : "tac-path-line is-active-playback"
              }
              points={activePlaybackMove.pathPcts.map((p) => `${p[0]},${p[1]}`).join(" ")}
            />
            {activePlaybackMove.pathPcts.slice(1).map((pt, i) => (
              <circle
                key={`pb_${i}`}
                className={
                  activePlaybackMove.side === "foe"
                    ? "tac-step-dot is-foe"
                    : "tac-step-dot"
                }
                cx={pt[0]}
                cy={pt[1]}
                r="0.52"
              />
            ))}
            {(() => {
              const dest =
                activePlaybackMove.pathPcts[
                  activePlaybackMove.pathPcts.length - 1
                ];
              return (
                <circle
                  className={
                    activePlaybackMove.side === "foe"
                      ? "tac-dest-ring is-foe"
                      : "tac-dest-ring"
                  }
                  cx={dest[0]}
                  cy={dest[1]}
                  r={Math.max(1.3, Math.min(cw, ch) * 0.38)}
                />
              );
            })()}
          </g>
        )}
    </svg>
  );
}
