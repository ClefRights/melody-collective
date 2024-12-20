import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handlePayment = () => {
    navigate("/signup", { state: { fromPurchase: true } });
  };

  return (
    <div className="min-h-screen bg-[#4B5D78]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl font-bold mb-4 text-[#FFFFF0] font-sans">Welcome to ClefRights</h1>
          <p className="text-xl text-[#FFFFF0]/80 font-light">Manage your music rights with confidence</p>
          <div className="space-x-4">
            <Button 
              onClick={handleSignup}
              className="bg-[#FFFFF0] text-[#4B5D78] hover:bg-[#FFFFF0]/90"
            >
              Sign Up Now
            </Button>
            <Button 
              onClick={handlePayment}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Purchase Rights
            </Button>
          </div>
        </div>

        <div className="bg-[#FFFFF0] rounded-lg p-8 shadow-lg prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6 text-[#4B5D78]">About the company</h2>
          <p>ClefRights is a music publisher founded in 2019. The primary founder is Mary Lucia Darst, a classical violist who has over fifteen years experience in the music publishing sector. ClefRights's primary performing rights organization (PRO) affiliation is with the American Society for Composers, Authors, and Publishers (ASCAP). By January 2025, we will have an additional company named ClefRights that will have its publisher affiliation with Broadcast Music Incorporated (BMI). For licensing, ClefRights is enrolled with the Mechanical Licensing Collective (MLC), and Music Reports, Inc (MRI) to cover streaming rights, such as Spotify or Apple Music. ClefRights will be enrolled with the Harry Fox Agency (HFA) as well as the MLC and MRI.</p>

          <p>We are also able to navigate the Dramatists Guild for the registration of operatic or musical theatre works.</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-[#4B5D78]">Who we co-publish</h3>
          <p>ClefRights is genre and performance-style agnostic. We have worked with opera singers who write popular music on the side, hip-hop artist-composers, or classically-trained violinists who also write and perform music for streaming. We support the creation of new music in all forms.</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-[#4B5D78]">Co-publish with us</h3>
          <p>Unlike most traditional publishers, we do not take one hundred percent (100%) of the copyright. We take fifty-five percent (55%) and set the composer or songwriter up as a co-publisher alongside us. We are partners to the composer or songwriter. This approach to publishing provides us with the ability to register works at the licensing level, which only a publisher can do, and to do the required data maintenance with the agencies. We take only fifty-five percent of the copyright to reflect a shifting role for publishers in the music landscape, e.g. technological advances mean that publishers no longer need to front money for studio space, demonstration recordings, or to pay for production.</p>

          <p>At this time, we charge filing fees between one hundred and two hundred seventy five dollars ($100 – $275) to open publisher accounts for composers or songwriters. PROs and licensing agencies require that in order to receive royalties there has to be a publisher entity that is distinct from the songwriter or composer's personal writer's account. This is not pay to publish, and the cost will be lower if the composer or songwriter already has a publisher affiliation with a PRO.</p>

          <p>The reason it is very important that the composer or songwriter have a publisher entity that is registered alongside us at the agencies is that it is the entity which receives royalty money. ClefRights is changing the traditional system where the publisher is paid and writes a check to the composer or songwriter. We want to promote transparency by having the PRO and licensing agencies make the split. Your royalty money comes directly to you, not to us. Composers and songwriters should note that each agency pays out on a different schedule and some of them have minimum royalty thresholds that must be met before monies are released. We as co-publishers can provide guidance on timelines, but we have no control over payment schedules.</p>

          <p>Regarding registration of copyrights with the US Library of Congress | Copyright Office, this is a necessary step for the MLC royalties to be released. As co-publishers, ClefRights will split the cost of registration with the composer or songwriter's publisher entity. For reasons of economy, we recommend that composers or songwriters wait until they have enough material to submit in batches of ten. The cost of submitting a single work for copyright is $45, while a batch of ten works is $85. Responsibility for making the filing with the US Library of Congress | Copyright Office is assumed to be the composer or songwriter's.</p>

          <p>Because the composer or songwriter is a co-publisher, they will retain direct involvement in the licensing and use of their works. At this time, co-publishing is by the work, meaning that we are non-exclusive and do not sign composers or songwriters in the way of traditional publishers.</p>

          <p>If a composer or songwriter wishes to have a more traditional publisher relationship where they are not tasked with any administrative work and have a consistent relationship with a single publisher, ClefRights is willing to work as the sole publisher conditional upon receiving one hundred percent of the copyright. If a composer or songwriter chooses this option, there will be no filing fees and responsibility for copyright registration with the US Library of Congress | Copyright Office is the publisher's.</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-[#4B5D78]">Ethos for licensing published music</h3>
          <p>ClefRights will not license music for use in pornography – as defined by US law – or violent materials, such as films or video games, which receive an NC-17 rating from the Motion Picture Association (MPA). If a composer or songwriter wishes to license music for use in pornographic or NC-17 material and ClefRights is the co-publisher, the composer or songwriter is welcome to communicate with ClefRights and we will discuss the process for the composer or songwriter to buy out our share of the publishing.</p>

          <p>If the composer or songwriter has specific requests or restrictions, for example they do not wish their music to be included under general commercial licenses issued by ASCAP or BMI, we will work to accommodate them. That said, we must be informed at the time of registration since that is the time to opt out of general licenses issued by PROs. If we receive no specific directions, we will automatically opt in to all licenses issued by PROs or the licensing agencies. As a co-publisher, the composer or songwriter may still deny a license via their own accounts.</p>

          <p>As previously stated, ClefRights uses the Harry Fox Agency (HFA) for synchronization licenses and all mechanical licenses not covered by the MLC or MRI. We do not take an equivalency fee as a result. Composers and songwriters should be aware, though, that the HFA takes a fifteen percent (15%) fee from licenses issued by them. This fee is deducted prior to the division and disbursement of publisher royalties.</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-[#4B5D78]">Demos</h3>
          <p>At this time, we do not finance the recording of demos. This means that composers or songwriters will not be surprised by demo charges being deducted from their royalties.</p>

          <p>Instead, for classical-style composers, we accept and treat MIDI files of compositions generated by the composer themselves as the demo. We expect composers to upload MIDI files to an unlisted YouTube account to which we will have access as the co-publisher. This is so that we can help composers with the placement process. Classical-style composers are expected to do their own engraving, but we will assist with digital delivery of scores to interested parties.</p>

          <p>For songwriters, we expect them to make a basic recording using commonly available recording technology. The recording should include the block chords and a clear enunciation of the lyrics. Pitch perfect singing is not required. In the event that the singing is unacceptably out of tune, we encourage songwriters to use easily accessible autotune software. The purpose is not to have a polished master recording, but to show the music's potential to a record producer. We expect songwriters to make these demos available to us via either Google Drive or Dropbox. It is part of the contract that we will share these demos with producers as we see fit to promote you as a composer or songwriter.</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-[#4B5D78]">Record labels and other placement</h3>
          <p>We do not, at this time, have a sister record label. However, we are in the process of partnering with at least one record label. Our commitment to our composers and songwriters is that in the event that we are asked to accept sweetheart deals – where the label asks for a lower license fee than is standard – with our partners, we will not do so without conferring with you first as our co-publisher. We do not wish to stand in the composer or songwriter's way if they feel that a lower license fee is an acceptable exchange for production or performance. So if they agree, we will as well.</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-[#4B5D78]">Contact</h3>
          <p>If you have any questions, please email our primary publisher Mary Lucia Darst. Her address is: marylucia@maryluciadarst.com.</p>

          <p>If you would like a video meeting, feel free to book a meeting via her Calendly. The link is: <a href="https://calendly.com/marylucia-maryluciadarst" className="text-blue-600 hover:text-blue-800">https://calendly.com/marylucia-maryluciadarst</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
