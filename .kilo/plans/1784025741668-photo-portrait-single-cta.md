# Photo Portrait Single CTA Button

## Goal
Replace the two CTA buttons shown for `type === "photo"` products on `app/(allsite)/(site)/shop/[slug]/page.jsx` with a single button.

## Required Change
In `app/(allsite)/(site)/shop/[slug]/page.jsx`, replace the current photo CTA block:

```jsx
{data?.type === "photo" ? (
    <div className="flex flex-col gap-2 sm:flex-row">
        <button
            onClick={(e) => handleCustomizerNav(e, `/application/deckcard/${data?.slug}`)}
            disabled={btnLoading}
            className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-sky-500 text-white py-2.5 px-4 text-md font-semibold shadow-lg hover:brightness-105 transition cursor-pointer"
        >
            {btnLoading ? <SpinLoader /> : <BsStars className="text-white text-xl" />}
            Create Your Deck
        </button>
        <button
            onClick={(e) => handleCustomizerNav(e, `/application/photoportrait/${data?.slug}`)}
            disabled={btnLoading}
            className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-emerald-500 text-white py-2.5 px-4 text-md font-semibold shadow-lg hover:brightness-105 transition cursor-pointer"
        >
            {btnLoading ? <SpinLoader /> : <BsStars className="text-white text-xl" />}
            Create Your Photo Portrait
        </button>
    </div>
) : (
```

With this single button:

```jsx
{data?.type === "photo" ? (
    <button
        onClick={(e) => handleCustomizerNav(e, `/application/photoportrait/${data?.slug}`)}
        disabled={btnLoading}
        className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-sky-500 text-white py-2.5 px-4 text-md font-semibold shadow-lg hover:brightness-105 transition cursor-pointer"
    >
        {btnLoading ? <SpinLoader /> : <BsStars className="text-white text-xl" />}
        Create Your Photo Portrait
    </button>
) : (
```

## Design Decision
- Keep first button background: `bg-sky-500`
- Keep second button text: `Create Your Photo Portrait`
- Action: navigate to `/application/photoportrait/${data?.slug}`
- Remove the deck card CTA for photo products entirely

## Validation
- Run `npm run build` and confirm no compile errors
- Run `npm run lint` and confirm no new lint errors introduced
- Manual check: open a photo product shop page and verify only one CTA button renders
