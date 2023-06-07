"use client";

import { motion as m } from "framer-motion";

export default function page() {
  return (
    <div className="mx-auto my-24 max-w-7xl px-6 md:px-8 lg:my-32 xl:px-0">
      <div className="mx-auto my-8 max-w-2xl text-center">
        <m.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="my-8 py-8 text-xl font-semibold md:text-2xl"
        >
          Regulamin serwisu Tea Shop 🫖
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="pb-8 text-gray-800"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          cum, aliquid quasi aspernatur rem reprehenderit dolore saepe atque
          unde architecto ratione beatae, doloremque corporis deserunt, iure eos
        </m.p>

        <m.ul layout className="list-decimal space-y-2">
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            quaerat tempora eaque ipsum error iusto iure molestiae cupiditate
            maiores. Quae ducimus officiis, quo alias consectetur nulla saepe
            dolore neque minima repellendus corporis nemo, sunt aut ut impedit
            sint nobis quod! Hic suscipit rerum ipsam velit labore, facilis
            voluptate eos praesentium.
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            Ad, animi iure, optio ducimus quia aspernatur natus aliquid ipsa
            tenetur sit rem sint numquam consequuntur? Aut rerum magni ab
            quisquam ad eveniet officiis alias aliquam veniam. Deserunt quisquam
            ad porro a? Impedit excepturi vitae maxime, soluta placeat
            necessitatibus debitis esse ipsa ad rem, praesentium fugiat quas,
            labore corrupti voluptas.
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            Minima sapiente rem dolores ea minus nihil at, magnam porro tenetur
            est laudantium facilis, rerum, fugiat illo corrupti nesciunt.
            Necessitatibus libero corporis laboriosam, nulla, ut vel quasi illum
            porro, reprehenderit vitae nobis accusamus alias ipsum numquam
            dolorum. Cum, facere enim similique veritatis quam laudantium natus,
            voluptatem consectetur nemo quas sed?
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.55 }}
          >
            Ab inventore deleniti quo officiis ratione autem qui at expedita
            placeat odio? Officiis commodi adipisci maiores itaque! Qui quam
            corporis nihil veritatis! Cupiditate ratione esse laudantium quia
            modi? At quos nihil, quidem sint culpa dolor beatae voluptatibus
            officiis! Sed impedit cumque cupiditate, amet minus cum molestias
            rerum quia at esse!
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.65 }}
          >
            Voluptas facilis magnam totam voluptate error ipsam cum eius placeat
            cupiditate. Velit voluptatibus cupiditate ratione ipsa omnis
            voluptatem, sed impedit! Architecto excepturi eum delectus
            temporibus praesentium perferendis dolores at officia laborum sit?
            Eligendi voluptas laudantium quo fugiat praesentium commodi animi
            modi mollitia. In nulla voluptate eius, porro consectetur sint
            error!
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.75 }}
          >
            Facere numquam nam modi doloremque assumenda ea enim, unde dolorum
            eligendi fugit, nesciunt ex inventore beatae provident sapiente
            cumque laborum est incidunt alias? Voluptatem quae itaque dolorem
            molestias ab dolores praesentium fugit corporis, voluptatibus
            perferendis, repellat harum quos blanditiis exercitationem ducimus
            nulla illo. Corrupti tempora ipsam repellendus molestiae
            necessitatibus placeat.
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.85 }}
          >
            Aperiam dolor eveniet consequatur soluta quaerat, pariatur tempora
            exercitationem optio vero tenetur! Dolorum inventore officia
            consequatur ab tempore, fugiat provident necessitatibus quam fuga
            illo unde magnam neque, similique doloribus explicabo praesentium
            sit harum rem. Dignissimos mollitia provident recusandae deleniti.
            Totam autem quis debitis quam quisquam similique aliquid, eos
            incidunt necessitatibus.
          </m.li>
          <m.li
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.95 }}
          >
            Necessitatibus dolorem earum laudantium quisquam fugit maiores. Sit,
            corporis culpa! Id itaque facilis rerum? Laborum magnam asperiores
            culpa deleniti vel eum earum dolor aspernatur, recusandae enim quae
            odit molestias. Eius fugiat ducimus vel ipsam, voluptas soluta
            tempora voluptate. Amet dignissimos fuga cum similique enim illum et
            labore debitis voluptate quam.
          </m.li>
        </m.ul>
      </div>
    </div>
  );
}
