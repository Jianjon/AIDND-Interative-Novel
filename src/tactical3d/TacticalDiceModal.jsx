import React, { useEffect, useMemo, useState } from "react";
import PolyhedralDiceStage3D from "./PolyhedralDie3D.jsx";

function getDiePalette(sides, isCrit, isFumble) {
  if (isCrit) return { bodyColor: "#78350f", edgeColor: "#fbbf24" };
  if (isFumble) return { bodyColor: "#450a0a", edgeColor: "#ef4444" };
  switch (Number(sides)) {
    case 4:
      return { bodyColor: "#14532d", edgeColor: "#4ade80" };
    case 6:
      return { bodyColor: "#4c1d95", edgeColor: "#c084fc" };
    case 8:
      return { bodyColor: "#164e63", edgeColor: "#22d3ee" };
    case 10:
      return { bodyColor: "#701a75", edgeColor: "#e879f9" };
    case 12:
      return { bodyColor: "#7c2d12", edgeColor: "#fb923c" };
    case 20:
    default:
      return { bodyColor: "#172554", edgeColor: "#38bdf8" };
  }
}

export default function TacticalDiceModal({ roll, onComplete }) {
  const [phase, setPhase] = useState("rolling"); // rolling -> reveal -> dmg_roll -> outcome
  const [dmgRolling, setDmgRolling] = useState(false);

  const isMultiOnly = roll?.role === "damage" || roll?.role === "heal";
  const hasDmgDice = Array.isArray(roll?.dmgDice) && roll.dmgDice.length > 0;

  useEffect(() => {
    if (!roll) return undefined;
    setPhase("rolling");
    setDmgRolling(isMultiOnly);

    if (isMultiOnly) {
      const tReveal = setTimeout(() => {
        setDmgRolling(false);
        setPhase("outcome");
      }, 820);
      return () => {
        clearTimeout(tReveal);
      };
    }

    const tReveal = setTimeout(() => {
      setPhase("reveal");
    }, 780);

    const tOutcome = setTimeout(() => {
      setPhase("outcome");
      if ((roll.role === "attack" || roll.role === "enemy_attack") && roll.hit && hasDmgDice) {
        setDmgRolling(true);
      }
    }, 1120);

    const tDmgSettle =
      (roll.role === "attack" || roll.role === "enemy_attack") && roll.hit && hasDmgDice
        ? setTimeout(() => setDmgRolling(false), 1720)
        : null;

    return () => {
      clearTimeout(tReveal);
      clearTimeout(tOutcome);
      if (tDmgSettle) clearTimeout(tDmgSettle);
    };
  }, [roll, onComplete, isMultiOnly, hasDmgDice]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        onComplete?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onComplete]);

  const isEnemyAttack = roll?.side === "foe" || roll?.role === "enemy_attack";
  const isDefense = roll?.role === "defense";
  const isSave = roll?.role === "save";
  const isCheck = roll?.role === "check";
  const isHeal = roll?.role === "heal";
  const isDamageOnly = roll?.role === "damage";
  const isSuccess = Boolean(roll?.hit);
  const isCrit = Boolean(roll?.crit) || roll?.d20 === 20;
  const isFumble = roll?.d20 === 1;

  const d20StageList = useMemo(() => {
    if (!roll || isMultiOnly) return [];
    const pal = isEnemyAttack
      ? {
          bodyColor: phase !== "rolling" && isCrit ? "#7f1d1d" : "#450a0a",
          edgeColor: phase !== "rolling" && isCrit ? "#fbbf24" : "#fb7185",
        }
      : getDiePalette(20, phase !== "rolling" && isCrit, phase !== "rolling" && isFumble);
    return [{ sides: 20, value: roll.d20 ?? 10, ...pal, tag: isCrit ? "NAT 20" : isFumble ? "NAT 1" : "D20" }];
  }, [roll, isMultiOnly, isEnemyAttack, phase, isCrit, isFumble]);

  const multiDiceList = useMemo(() => {
    if (!roll || !hasDmgDice) return [];
    return roll.dmgDice.slice(0, 6).map((d) => ({
      sides: d.sides || 6,
      value: d.value,
      ...getDiePalette(d.sides || 6, false, false),
      tag: d.tag || `d${d.sides || 6}`,
    }));
  }, [roll, hasDmgDice]);

  if (!roll) return null;

  const roleBadge = isEnemyAttack
    ? "👹 敵方攻擊檢定"
    : isDefense
      ? "🛡️ 我方防禦 Roll 20"
      : isSave
        ? "✨ 我方豁免檢定"
        : isCheck
          ? "🔍 我方 DC 檢定"
          : isHeal
            ? "💚 我方治療擲骰"
            : isDamageOnly
              ? "✨ 我方法術傷害"
              : "⚔️ 我方攻擊檢定";

  const stampText = (() => {
    if (isEnemyAttack) {
      if (!isSuccess) return "MISSING!（我方 AC 擋下）";
      return isCrit ? "敵方暴擊！" : "命中我方！";
    }
    if (isHeal) return `恢復 ${roll.dmg} HP！`;
    if (isDamageOnly) return `造成 ${roll.dmg} 點傷害！`;
    if (isDefense) {
      if (isCrit) return "完美格擋！";
      return isSuccess ? "閃避成功！" : "防禦突破";
    }
    if (isSave) return isSuccess ? "豁免成功！" : "豁免失敗";
    if (isCheck) {
      if (isCrit) return "大成功！";
      return isSuccess ? "檢定成功！" : "檢定失敗";
    }
    if (isCrit) return "暴擊命中！";
    return isSuccess ? "命中！" : "未命中";
  })();

  const accentColor = isEnemyAttack
    ? isSuccess
      ? "#f87171"
      : "#38bdf8"
    : isHeal
      ? "#4ade80"
      : isCrit && isSuccess
        ? "#fbbf24"
        : isSuccess
          ? "#34d399"
          : "#f87171";

  const panelBg = isEnemyAttack
    ? "linear-gradient(180deg, rgba(44, 13, 21, 0.96), rgba(22, 7, 12, 0.97))"
    : "linear-gradient(180deg, rgba(17, 25, 39, 0.96), rgba(10, 15, 25, 0.97))";
  const panelIdleBorder = isEnemyAttack ? "rgba(251, 113, 133, 0.6)" : "rgba(220, 175, 115, 0.55)";

  const mods = Array.isArray(roll.modifiers) ? roll.modifiers : [];

  return (
    <div
      onClick={() => onComplete?.()}
      title="點擊或按空白鍵可跳過"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5, 9, 16, 0.46)",
        backdropFilter: "blur(2px)",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(93vw, 460px)",
          background: panelBg,
          border: `1.5px solid ${phase === "outcome" ? accentColor : panelIdleBorder}`,
          borderRadius: 14,
          padding: "16px 20px 14px",
          boxShadow: `0 20px 55px rgba(0, 0, 0, 0.78), 0 0 28px ${phase === "outcome" ? `${accentColor}33` : isEnemyAttack ? "rgba(244, 63, 94, 0.22)" : "rgba(220, 175, 115, 0.16)"}`,
          color: "#f8fafc",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        {/* Top Action Description */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: isEnemyAttack ? "#fda4af" : "#dcaf73", marginBottom: 3 }}>
            {roleBadge}
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fef3c7" }}>
            {roll.actorName} <span style={{ color: "#94a3b8", fontWeight: 500 }}>·</span> {roll.actionName}
            {roll.targetName ? (
              <span style={{ color: "#94a3b8", fontWeight: 500, fontSize: 13 }}> → {roll.targetName}</span>
            ) : null}
          </div>
          {roll.actionSummary && (
            <div
              style={{
                marginTop: 6,
                padding: "5px 10px",
                borderRadius: 7,
                background: "rgba(30, 41, 59, 0.72)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                color: "#e2e8f0",
                fontSize: 12,
                lineHeight: 1.45,
                textAlign: "left",
              }}
            >
              <strong style={{ color: "#38bdf8" }}>🎯 行動方式：</strong>
              {roll.actionSummary}
            </div>
          )}
        </div>

        {/* Multi-Die Only Stage (e.g. Magic Missile 3d4 / Cure Wounds 1d8) */}
        {isMultiOnly ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PolyhedralDiceStage3D dice={multiDiceList} rolling={dmgRolling} dieSize={74} gap={10} />
            {roll.dmgDice.length > 6 && (
              <div style={{ fontSize: 10, color: "#94a3b8" }}>（共 {roll.dmgDice.length} 顆骰子）</div>
            )}
            <div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 2 }}>
              {roll.dmgFormula}
              {roll.modTotal ? ` (加值 +${roll.modTotal})` : ""} ={" "}
              <strong style={{ color: accentColor, fontSize: 15 }}>{roll.total}</strong>
            </div>
          </div>
        ) : (
          <>
            {/* BG3-Style 3D D20 VS Target Showdown Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 112 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: isEnemyAttack ? "#fb7185" : "#38bdf8", marginBottom: 2 }}>
                  {isEnemyAttack ? "ENEMY (3D D20)" : "YOU (3D D20)"}
                </div>
                <PolyhedralDiceStage3D dice={d20StageList} rolling={phase === "rolling"} dieSize={88} />
                {roll.advState && roll.advState !== "normal" && phase !== "rolling" && (
                  <div style={{ marginTop: 2, fontSize: 10, color: roll.advState === "adv" ? "#4ade80" : "#fca5a5" }}>
                    {roll.advState === "adv" ? "優勢" : "劣勢"} [{(roll.rolls || []).join(", ")}]
                  </div>
                )}
              </div>

              <div style={{ fontSize: 18, fontWeight: 900, fontStyle: "italic", color: "#64748b" }}>VS</div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 112,
                  opacity: phase === "rolling" ? 0.55 : 1,
                  transition: "opacity 0.25s ease",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: isEnemyAttack ? "#38bdf8" : "#fb7185", marginBottom: 4 }}>
                  {isEnemyAttack ? "我方防禦 (AC)" : `TARGET (${roll.targetLabel || "DC"})`}
                </div>
                <div
                  style={{
                    position: "relative",
                    width: 82,
                    height: 82,
                    borderRadius: "50%",
                    border: isEnemyAttack ? "3px solid rgba(56, 189, 248, 0.65)" : "3px solid rgba(244, 63, 94, 0.55)",
                    background: isEnemyAttack
                      ? "radial-gradient(circle, rgba(14, 34, 56, 0.92), rgba(10, 18, 32, 0.96))"
                      : "radial-gradient(circle, rgba(30, 15, 25, 0.92), rgba(15, 10, 18, 0.96))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isEnemyAttack
                      ? "inset 0 0 16px rgba(56, 189, 248, 0.25)"
                      : "inset 0 0 16px rgba(244, 63, 94, 0.22)",
                  }}
                >
                  <span style={{ fontSize: 30, fontWeight: 900, fontFamily: "Georgia, serif", color: isEnemyAttack ? "#7dd3fc" : "#fda4af" }}>
                    {roll.targetValue ?? "?"}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: -7,
                      fontSize: 9.5,
                      fontWeight: 700,
                      background: isEnemyAttack ? "#082f49" : "#4c0519",
                      border: isEnemyAttack ? "1px solid #0284c7" : "1px solid #be123c",
                      color: isEnemyAttack ? "#bae6fd" : "#fecdd3",
                      padding: "1px 7px",
                      borderRadius: 99,
                    }}
                  >
                    {roll.targetLabel || "DC"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modifiers Breakdown & Total */}
            <div
              style={{
                marginTop: 10,
                paddingTop: 8,
                borderTop: "1px solid rgba(148, 163, 184, 0.2)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                opacity: phase === "rolling" ? 0.25 : 1,
                transition: "opacity 0.25s ease",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  background: "rgba(56, 189, 248, 0.14)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  color: "#bae6fd",
                  padding: "2px 7px",
                  borderRadius: 6,
                }}
              >
                d20({roll.d20})
              </span>
              {mods.map((m, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 11,
                    background: "rgba(148, 163, 184, 0.14)",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    color: "#e2e8f0",
                    padding: "2px 7px",
                    borderRadius: 6,
                  }}
                >
                  + {m}
                </span>
              ))}
              <span style={{ fontSize: 14, fontWeight: 900, color: "#38bdf8", marginLeft: 4 }}>
                = {roll.total}
              </span>
            </div>
          </>
        )}

        {/* Outcome Stamp & 3D Polyhedral Damage Dice Tray */}
        {phase === "outcome" && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div
              style={{
                padding: "3px 16px",
                borderRadius: 8,
                border: `2px double ${accentColor}`,
                background: isEnemyAttack
                  ? isSuccess
                    ? "rgba(127, 29, 29, 0.5)"
                    : "rgba(12, 74, 110, 0.5)"
                  : isSuccess || isHeal
                    ? "rgba(6, 78, 59, 0.45)"
                    : "rgba(127, 29, 29, 0.45)",
                color: accentColor,
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: "0.14em",
              }}
            >
              {stampText}
            </div>

            {!isMultiOnly && (roll.role === "attack" || isEnemyAttack) && roll.hit && hasDmgDice && (
              <div
                style={{
                  width: "100%",
                  marginTop: 2,
                  padding: "6px 8px",
                  borderRadius: 10,
                  background: isEnemyAttack ? "rgba(42, 12, 18, 0.72)" : "rgba(15, 23, 42, 0.72)",
                  border: isEnemyAttack ? "1px solid rgba(248, 113, 113, 0.35)" : "1px solid rgba(250, 204, 21, 0.28)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: isEnemyAttack ? "#fca5a5" : "#fde047", letterSpacing: "0.08em" }}>
                  {isEnemyAttack ? "🩸 敵方傷害擲骰" : "🎲 傷害擲骰"} {roll.dmgFormula ? `· ${roll.dmgFormula}` : ""}
                </div>
                <PolyhedralDiceStage3D dice={multiDiceList} rolling={dmgRolling} dieSize={56} gap={8} />
                {!dmgRolling && (
                  <div style={{ fontSize: 12, fontWeight: 800, color: isEnemyAttack ? "#fca5a5" : "#fde047" }}>
                    {isEnemyAttack ? `🩸 受到 ${roll.dmg} 點傷害` : `💥 總計造成 ${roll.dmg} 點傷害`}
                  </div>
                )}
              </div>
            )}

            {!isMultiOnly && isDefense && roll.dmg > 0 && (
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fca5a5",
                  background: "rgba(127, 29, 29, 0.35)",
                  padding: "3px 10px",
                  borderRadius: 99,
                  border: "1px solid rgba(248, 113, 113, 0.4)",
                }}
              >
                🩸 受到 {roll.dmg} 點傷害
              </div>
            )}
          </div>
        )}

        {phase === "outcome" && !dmgRolling && roll.outcomeText && (
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              borderRadius: 8,
              background: roll.hit ? "rgba(6, 78, 59, 0.35)" : "rgba(127, 29, 29, 0.32)",
              border: `1px solid ${roll.hit ? "rgba(52, 211, 153, 0.45)" : "rgba(248, 113, 113, 0.45)"}`,
              color: "#f1f5f9",
              fontSize: 12.5,
              lineHeight: 1.55,
              textAlign: "left",
            }}
          >
            {roll.outcomeText}
          </div>
        )}

        {phase === "outcome" && !dmgRolling ? (
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.();
              }}
              style={{
                padding: "6px 22px",
                borderRadius: 8,
                border: `1.5px solid ${accentColor}`,
                background: isEnemyAttack ? "rgba(190, 18, 60, 0.35)" : "rgba(14, 116, 144, 0.35)",
                color: "#f8fafc",
                fontSize: 12.5,
                fontWeight: 800,
                letterSpacing: "0.08em",
                cursor: "pointer",
                boxShadow: `0 0 14px ${accentColor}33`,
              }}
            >
              {roll.confirmLabel || "✓ 確認繼續（空白鍵 / 點擊）"}
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 8, textAlign: "center", fontSize: 10, color: "#64748b" }}>
            骰子滾動中…（點擊或按空白鍵可跳過）
          </div>
        )}
      </div>
    </div>
  );
}
