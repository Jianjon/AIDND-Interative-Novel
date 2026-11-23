import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ChevronRight, Heart, User, Bot, Activity, CirclePlay } from "lucide-react";

export default function CharacterRosterCard({
  character: a,
  state: t,
  pendingAction: i,
  onOpenSheet: s,
  onOpenActions: r,
  onToggleControl: c,
  disabledActions: n = !1,
  cardBorder: o = "border border-slate-700 hover:border-slate-500",
  cardBg: l = "bg-transparent",
  zIndexClass: m = "z-0",
  showGlow: d = !1,
  healthLabel: f,
  statusLabel: v,
  children: E,
}) {
  const x = Math.max(1, t.maxHp || a.maxHp || 1),
    b = t.hp ?? a.hp ?? 0,
    T = b <= 0,
    I = () => {
      !n && !T && (r == null || r());
    };
  return jsxs("div", {
    className: `character-roster-card group relative p-3 rounded transition-all flex flex-col gap-2 ${o} ${l} ${m}`,
    role: "button",
    tabIndex: 0,
    "aria-label": `${a.name}的對話與行動`,
    onClick: I,
    onKeyDown: (W) => {
      W.target === W.currentTarget &&
        ["Enter", " "].includes(W.key) &&
        (W.preventDefault(), I());
    },
    children: [
      d &&
        jsx("div", {
          className:
            "absolute inset-0 rounded border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)] animate-pulse pointer-events-none z-10",
        }),
      jsxs("div", {
        className: "flex items-center gap-4 w-full",
        children: [
          jsxs("button", {
            type: "button",
            className:
              "roster-portrait relative shrink-0 pointer-events-auto transition-transform hover:scale-105 z-20",
            "aria-label": `查看${a.name}角色卡`,
            title: "View Character Details",
            onClick: (W) => {
              (W.preventDefault(), W.stopPropagation(), s == null || s());
            },
            children: [
              jsx("div", {
                className:
                  "w-20 h-20 rounded-full border-2 border-slate-800 overflow-hidden shadow-sm bg-slate-900/90 flex items-center justify-center",
                children: jsx("img", {
                  src: a.avatar || a.avatarUrl,
                  alt: a.name,
                  className: "w-full h-full object-contain object-center",
                }),
              }),
              i &&
                jsx("span", {
                  className:
                    "absolute -top-1 -right-1 bg-amber-500 text-slate-900 rounded-full p-1",
                  children: jsx(CirclePlay, { size: 14 }),
                }),
            ],
          }),
          jsxs("div", {
            className: "flex-1 min-w-0",
            children: [
              jsxs("div", {
                className: "flex justify-between items-center mb-1 gap-2",
                children: [
                  jsx("strong", {
                    className: `font-tome-header truncate text-lg ${T ? "text-slate-500" : "text-slate-200"}`,
                    children: a.name,
                  }),
                  c &&
                    jsxs("button", {
                      type: "button",
                      title: "Toggle Control Mode",
                      className:
                        "flex items-center gap-1 px-2 py-1 rounded border border-slate-700 text-slate-400 text-[9px]",
                      onClick: (W) => {
                        (W.preventDefault(), W.stopPropagation(), c());
                      },
                      children: [
                        a.controlMode === "auto"
                          ? jsx(Bot, { size: 10 })
                          : jsx(User, { size: 10 }),
                        a.controlMode === "auto" ? "Auto" : "Manual",
                      ],
                    }),
                ],
              }),
              jsx("span", {
                className: "text-xs text-slate-500",
                children: a.class || a.role,
              }),
              jsx("div", {
                className:
                  "w-full h-2 bg-slate-800 overflow-hidden my-2 border border-slate-700",
                children: jsx("div", {
                  className: `h-full transition-all ${b / x < 0.3 ? "bg-red-600" : "bg-emerald-600"}`,
                  style: {
                    width: `${Math.max(0, Math.min(100, (b / x) * 100))}%`,
                  },
                }),
              }),
              jsx("div", {
                className: "flex justify-between text-xs text-slate-400 gap-2",
                children: i
                  ? jsxs("span", {
                      className:
                        "text-amber-500 truncate flex items-center gap-1",
                      children: [jsx(ChevronRight, { size: 12 }), i],
                    })
                  : jsxs(Fragment, {
                      children: [
                        jsxs("span", {
                          className:
                            "flex items-center gap-1 whitespace-nowrap",
                          children: [
                            jsx(Heart, { size: 10 }),
                            f || `${Math.round((b / x) * 100)}%`,
                          ],
                        }),
                        jsxs("span", {
                          className: "flex items-center gap-1 text-right",
                          children: [
                            jsx(Activity, { size: 10 }),
                            v || t.psych || "正常",
                          ],
                        }),
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      E,
    ],
  });
}
