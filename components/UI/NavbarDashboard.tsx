
export default async function NavbarDashboard() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <form>
          <input type="search" placeholder="search" />
        </form>
        <form>
          <button type="submit">
            {/* <Image src="/assets/images/ui/mic.png" alt="voice recognition" width={30} height={30} className="border" /> */}
            <span className="material-symbols-outlined">mic</span>
          </button>
        </form>
      </div>
    </>
  )
}
