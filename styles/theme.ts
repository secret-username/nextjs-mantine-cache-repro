'use client'

import { createTheme, Modal } from "@mantine/core";


export const theme = createTheme({
  components: {
    Modal: Modal.extend({
      defaultProps: {
        transitionProps: { exitDuration: 0 },
      },
    }),
  },
});